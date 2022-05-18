import express from 'express';
import { ExcelFileReader } from '../utils/excel';
import Joi from 'joi';
import { GENERAL_CONSTANTS, MCOA_ERRORS } from '../processor/mcoa/constants';
import { MappingTableParser } from '../processor/mcoa/mapping-table';
import { migrationData, systemGuid } from '../utils/constants/constants';
import { Log } from '../utils/logger/logger';
import { COMMAND_NAMES, STREAM_NAME } from '../utils/constants/events';
import { fetchMappingId, verifyRequestFormat, writeToMessageStore } from '../utils/helper/helper';
import { messagestore } from '../config/message-store';
import uuid from 'uuid/v4';
import { genericParser } from '../processor/mcoa/generic-parser';
import { mcoaQueries } from '../services/mcoa-queries';
import { escape } from 'html-escaper';

function buildRouter() {
  const router = express.Router();
  router['config'] = {
    schema: {
      migrationData: Joi.array().items(),
      migrationLineItem: Joi.object().keys({
        propertyType: Joi.string().valid(...migrationData.PROPERTY_TYPE).required(),
        productId: Joi.number().valid(...migrationData.PRODUCT_ID).required(),
        subProductId: Joi.number().valid(...migrationData.SUBPRODUCT_ID).allow("").optional(),
        sourceLineItem: Joi.string().required(),
        sourceLineItemHead: Joi.string().allow("").optional(),
        userId: Joi.string().guid().optional(),
        productType: Joi.string().valid(...migrationData.PRODUCT_TYPE).allow("").optional(),
        formType: Joi.string().valid(...migrationData.FORM_TYPE).optional(),
        chartOfAccountGroup: Joi.string().valid(...migrationData.CHART_OF_ACCOUNT_GROUP).required(),
        group: Joi.string().valid(...migrationData.GROUP).optional(),
        createdBy: Joi.string().guid().required(),
        code: Joi.string().allow("").required(),
        mcoaCode: Joi.string().allow("").optional(),
        frequency: Joi.number().optional(),
        reason: Joi.string().optional()
      }),
      removeLineItem: Joi.object().keys({
        mappingId: Joi.string().guid().required(),
        reason: Joi.string().optional(),
        requestedBy: Joi.string().guid().required(),
      }),
      upgradeLineItems: Joi.object().keys({
        mcoaCode: Joi.array().items(Joi.string().required()),
        requestedBy: Joi.string().guid().required(),
      })
    }
  }

  router.post('/migrateMappingData', async (req, res) => {
    try {
      const modifiedReq = verifyRequestFormat(req, 'body')
      const payload = modifiedReq.body
      let status: any;
      const mappingTableParser = new MappingTableParser();

      const validLineItemRows = []
      const invalidLineItemRows = []
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      if (payload['migrationData'] && payload['migrationData'].length) {
        Joi.validate(payload.migrationData, router['config'].schema.migrationData);
        payload['migrationData'].forEach(row => {
          const isValid = Joi.validate(row, router['config'].schema.migrationLineItem);
          if (isValid.error) {
            Log.info('command validation error', isValid.error)
            invalidLineItemRows.push(row)
          } else {
            validLineItemRows.push(row)
          }
        });
        if (validLineItemRows.length) {
          mappingTableParser.mapLineItems(validLineItemRows, COMMAND_NAMES.CHANGE_MAPPING)
          status = 'Successfully published the command'
        }

      } else if (payload['base64'] && payload['base64'].length && payload['createdBy']) {

        const parsedData = new ExcelFileReader().getExcelData(payload.base64);

        if (!parsedData) {
          status = MCOA_ERRORS.SHEET_NAME_VALIDATION;
          return res.status(200).json({ status: escape(status) })
        }
        parsedData.forEach((data, index) => {
          const formattedData = {}
          if (index) {
            for (let i = 0; i < parsedData[0].length; i++) {
              if (parsedData[0][i] && parsedData[0][i] === 'code' && !GENERAL_CONSTANTS.noCodeRegex.test(data[i]) && data[i]) {
                formattedData[parsedData[0][i]] = String(Number(data[i]).toFixed(2))
              } else if (parsedData[0][i]) {
                formattedData[parsedData[0][i]] = data[i]
              }
            }

            formattedData['createdBy'] = payload.createdBy
            const isValid = Joi.validate(formattedData, router['config'].schema.migrationLineItem);
            formattedData['createdBy'] = systemGuid;

            if (isValid.error) {
              invalidLineItemRows.push(formattedData)
            } else {
              validLineItemRows.push(formattedData)
            }
          }

        })
        if (validLineItemRows.length) {
          mappingTableParser.mapLineItems(validLineItemRows, COMMAND_NAMES.CHANGE_MAPPING)
          status = 'Successfully published the command'
        }
      } else {
        return res.json({ status: 'Error validating payload' })
      }

      return res.json(JSON.parse(decodeURIComponent(encodeURIComponent(JSON.stringify({ result: status, invalidLineItemRows })))));
    } catch (error) {
      Log.error('Error in migrateMappingData', error)
      throw error
    }
  });

  router.post('/updateMappedData', async (req, res) => {
    try {
      const modifiedReq = verifyRequestFormat(req, 'body')
      const payload = modifiedReq.body
      let statusToAdd: any;
      let statusToRemove: any;
      let status: any
      const mappingTableParser = new MappingTableParser();
      const validLineItemRowsToAdd = []
      const validLineItemRowsToRemove = []
      const invalidLineItemRowsToAdd = []
      const invalidLineItemRowsToRemove = []
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      if (payload['base64'] && payload['base64'].length && payload['requestedBy']) {
        const parsedData = new ExcelFileReader().getExcelData(payload.base64);
        if (!parsedData) {
          status = MCOA_ERRORS.SHEET_NAME_VALIDATION;
          return res.status(400).json({ status: escape(status) });
        }
        const maxEachMappingColumns = 30
        const eachMappingColumnLength = parsedData[0].length
        //?! Some times we do have 2.7 lakh records in the excel so handle that aswell!!!
        const maxMcoaMappings = 5000
        const totalMappingsAvailable = payload.base64 ? parsedData.length : 0;
        if (totalMappingsAvailable <= maxMcoaMappings) {
          main: for (let j = 0; j < totalMappingsAvailable; j++) {
            const formattedDataToAdd = {}
            const formattedDataToRemove = {}
            const data = parsedData[j]

            if (eachMappingColumnLength <= maxEachMappingColumns) {
              if (j) { // do not consider the header
                for (let i = 0; i < eachMappingColumnLength; i++) {
                  if (parsedData[0][i] && parsedData[0][i] === 'proposedCode') {
                    if (!data[i]) {
                      continue main;
                    }
                    formattedDataToAdd['code'] = String(Number(data[i]).toFixed(2))
                  } else if (parsedData[0][i] && parsedData[0][i] === 'code') {
                    formattedDataToRemove[parsedData[0][i]] = String(Number(data[i]).toFixed(2))
                  } else if (parsedData[0][i]) {
                    formattedDataToAdd[parsedData[0][i]] = data[i]
                    formattedDataToRemove[parsedData[0][i]] = data[i]
                  }
                }

                formattedDataToAdd['createdBy'] = payload.requestedBy
                formattedDataToRemove['requestedBy'] = payload.requestedBy
                const mappingId = await fetchMappingId({
                  mcoaCode: formattedDataToRemove['mcoaCode'],
                  sourceLineItem: formattedDataToRemove['sourceLineItem'],
                  sourceLineItemHead: formattedDataToRemove['sourceLineItemHead'],
                  chartOfAccountGroup: formattedDataToRemove['chartOfAccountGroup'],
                  propertyType: formattedDataToRemove['propertyType'],
                  productId: formattedDataToRemove['productId'],
                  subProductId: formattedDataToRemove['subProductId'],
                  code: formattedDataToRemove['code'],
                  requestedBy: formattedDataToRemove['requestedBy']
                })
                let obj = {};
                if (mappingId) {
                  obj = {
                    mappingId,
                    requestedBy: formattedDataToRemove['requestedBy'],
                    reason: 'Removed By System'
                  }
                }
                const isValidToAdd = Joi.validate(formattedDataToAdd, router['config'].schema.migrationLineItem);
                const isValidToRemove = Joi.validate(obj, router['config'].schema.removeLineItem);
                formattedDataToAdd['createdBy'] = systemGuid;
                obj['requestedBy'] = systemGuid;

                if (isValidToRemove.error) {
                  invalidLineItemRowsToRemove.push(obj)
                } else {
                  validLineItemRowsToRemove.push(obj)
                }

                if (isValidToAdd.error) {
                  invalidLineItemRowsToAdd.push(formattedDataToAdd)
                } else {
                  validLineItemRowsToAdd.push(formattedDataToAdd)
                }
              }
            }
          }
        }
        if (!invalidLineItemRowsToAdd.length && !invalidLineItemRowsToRemove.length) {
          if (validLineItemRowsToRemove.length) {
            await mappingTableParser.mapLineItems(validLineItemRowsToRemove, COMMAND_NAMES.REMOVE_MAPPING)
            statusToRemove = 'Successfully published the command to remove line items'
          }
          if (validLineItemRowsToAdd.length) {
            await mappingTableParser.mapLineItems(validLineItemRowsToAdd, COMMAND_NAMES.CHANGE_MAPPING)
            statusToAdd = 'Successfully published the command to add line items'
          }
        } else {
          statusToAdd = invalidLineItemRowsToAdd.length ? 'Joi Validation Failed while validating items to add.' : 'No Validation Errors found'
          statusToRemove = invalidLineItemRowsToRemove.length ? 'Joi Validation Failed while validating items to remove.' : 'No Validation Errors found'
        }
      } else {
        status = 'Error validating payload'
        return res.status(400).json({ status: escape(status) })
      }

      return res.status(200).json({ statusToAdd, statusToRemove, invalidLineItemRowsToAdd, invalidLineItemRowsToRemove });
    } catch (error) {
      Log.error('Error in removeMappingData', error)
      throw error
    }
  });

  router.post('/removeMappedData', async (req, res) => {
    try {
      const modifiedReq = verifyRequestFormat(req, 'body')
      const payload = modifiedReq.body
      let statusToRemove: any;
      let status: any
      const mappingTableParser = new MappingTableParser();

      const validLineItemRowsToRemove = []
      const invalidLineItemRowsToRemove = []
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      if (payload['removeMappingIds'] && payload['removeMappingIds'].length && payload['requestedBy']) {
        payload.removeMappingIds.forEach(mappingId => {
          const obj = {
            mappingId,
            requestedBy: payload['requestedBy'],
            reason: 'Removed By System'
          };
          const isValidToRemove = Joi.validate(obj, router['config'].schema.removeLineItem);
          obj['requestedBy'] = systemGuid;

          if (isValidToRemove.error) {
            invalidLineItemRowsToRemove.push(obj)
          } else {
            validLineItemRowsToRemove.push(obj)
          }
        })
      } else if (payload['base64'] && payload['base64'].length && payload['requestedBy']) {

        const parsedData = new ExcelFileReader().getExcelData(payload.base64);

        if (!parsedData) {
          status = MCOA_ERRORS.SHEET_NAME_VALIDATION;
          return res.status(400).json({ status: escape(status) })
        }

        const maxMcoaMappings = 3000
        const max_eachMappingColumns = 30
        const totalMappingsAvailable = parsedData.length
        const eachMappingColumnLength = parsedData[0].length

        if (totalMappingsAvailable <= maxMcoaMappings) {
          for (let j = 0; j < totalMappingsAvailable; j++) {
            const formattedDataToRemove = {}
            const data = parsedData[j]
            if (eachMappingColumnLength <= max_eachMappingColumns) {
              if (j) { // do not consider the header
                for (let i = 0; i < eachMappingColumnLength; i++) {
                  if (parsedData[0][i] && parsedData[0][i] === 'code') {
                    formattedDataToRemove[parsedData[0][i]] = String(Number(data[i]).toFixed(2))
                  } else if (parsedData[0][i]) {
                    formattedDataToRemove[parsedData[0][i]] = data[i]
                  }
                }

                formattedDataToRemove['requestedBy'] = payload.requestedBy
                const mappingId = await fetchMappingId({
                  mcoaCode: formattedDataToRemove['mcoaCode'],
                  sourceLineItem: formattedDataToRemove['sourceLineItem'],
                  sourceLineItemHead: formattedDataToRemove['sourceLineItemHead'],
                  chartOfAccountGroup: formattedDataToRemove['chartOfAccountGroup'],
                  propertyType: formattedDataToRemove['propertyType'],
                  productId: formattedDataToRemove['productId'],
                  subProductId: formattedDataToRemove['subProductId'],
                  code: formattedDataToRemove['code'],
                  requestedBy: formattedDataToRemove['requestedBy']
                })
                let obj = {};
                if (mappingId) {
                  obj = {
                    mappingId,
                    requestedBy: formattedDataToRemove['requestedBy'],
                    reason: 'Removed By System'
                  }
                }
                const isValidToRemove = Joi.validate(obj, router['config'].schema.removeLineItem);
                obj['requestedBy'] = systemGuid;

                if (isValidToRemove.error) {
                  invalidLineItemRowsToRemove.push(obj)
                } else {
                  validLineItemRowsToRemove.push(obj)
                }

              }
            }
          }
        }
      } else {
        status = 'Error validating payload'
        return res.status(400).json({ status: escape(status) })
      }

      if (!invalidLineItemRowsToRemove.length && validLineItemRowsToRemove.length) {
        await mappingTableParser.mapLineItems(validLineItemRowsToRemove, COMMAND_NAMES.REMOVE_MAPPING)
        statusToRemove = 'Successfully published the command to remove line items'
      } else {
        statusToRemove = invalidLineItemRowsToRemove.length ? 'Joi Validation Failed while validating items to remove.' : 'No Validation Errors found'
      }
      return res.status(200).json({ statusToRemove, invalidLineItemRowsToRemove });

    } catch (error) {
      Log.error('Error in removeMappingData', error)
      throw error
    }
  });

  router.post('/alterMappingData', async (req, res) => {
    try {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      const modifiedReq = verifyRequestFormat(req, 'body')
      const payload = modifiedReq.body
      const eventData = {
        id: uuid(),
        type: 'AlterMapping',
        metadata: {
          correlationId: uuid(),
          requesterId: payload.requestedUserId
        },
        data: {
          ...payload,
          alterId: uuid()
        }
      }
      const response: any = await writeToMessageStore(messagestore, STREAM_NAME.MCOA_MAPPING_COMMAND, eventData);
      return res.status(200).json({ response })
    } catch (error) {
      Log.error('Error in alterMappingData', error)
      throw error
    }
  })
  router.post('/upgradeMappingVersion', async (req, res: any) => {
    try {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      const modifiedReq = verifyRequestFormat(req, 'body')
      const payload = modifiedReq.body
      const result = Joi.validate(payload, router['config'].schema.upgradeLineItems);
      if (result.error) {
        const status = 'Error validating payload ' + result.error;
        return res.status(403).json({ status: escape(status) })
      }

      const mcoaObj = [];
      const mcoaCodeLength = payload.mcoaCode.length;
      const maxIterations = 1000;
      if (mcoaCodeLength <= maxIterations) {
        for (const code of payload.mcoaCode) {
          let obj = {
            mcoaCode: code
          };
          // Get latest record from mcoa_master
          const mcoaLineItem = await genericParser.fetchLatestMcoaLineItemByMcoaCode(obj.mcoaCode);
          if (!mcoaLineItem) {
            Log.info(`${obj.mcoaCode} does not exists in mcoa master data`)
            obj['status'] = `MCOA code ${obj.mcoaCode} does not exists in mcoa master data`;
            mcoaObj.push(obj);
            continue;
          } else {
            obj['mcoaVersion'] = mcoaLineItem.mcoa_version
          }

          // Update mcoa_mapping table using mcoa_code with latest version
          const updatedRows = await mcoaQueries.updateMappingVersionByMcoaCode(obj.mcoaCode, obj['mcoaVersion']);
          if (updatedRows > 0) {
            obj['status'] = "Successfully Upgreded " + updatedRows + " rows with MCOA Code " + obj.mcoaCode;
          } else {
            obj['status'] = "No rows upgreded with MCOA Code " + obj.mcoaCode;
          }
          mcoaObj.push(obj);
        }
      } else {
        const status = 'Maximum Input length exceeded'
        return res.json({ status: escape(status) })
      }
      return res.json({ response: mcoaObj })

    } catch (error) {
      Log.error('Error in upgradeMappingVersion', error)
      throw res.boom.badRequest(error)
    }
  });

  return router;
}

export const router = buildRouter();
