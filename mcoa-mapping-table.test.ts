import { Application } from 'express';
import sinon from 'sinon';
import Request from 'supertest';
import fpMcoaService from '../index';
import { base64, base64ToRemoveLineItems, migrateLineItems } from '../utils/mock-data/mapping-table';
import { MappingTableParser } from '../processor/mcoa/mapping-table';
import * as helper from '../processor/mcoa/helper';
import { ExcelFileReader } from '../utils/excel';
import { GenericMcoaParser } from '../processor/mcoa/generic-parser';
import { McoaQueries } from '../services/mcoa-queries';

describe('MCOA', () => {
    const application: Application = fpMcoaService.app;

    afterAll(() => {
        fpMcoaService.server();
    })

    beforeAll(() => {
        sinon.restore()
    })

    afterEach(() => {
        sinon.restore()
    })

    test('#POST should publish migrated mapping lineItems in base 64 successfully', async () => {
        const payload = base64;
        sinon.stub(helper, 'checkMcoaLineItemExists').resolves(null)
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/migrateMappingData').send(payload);
        expect(result['res'].statusCode).toBe(200);
    });


    test('#POST should publish migrated mapping lineItems returns error', async () => {
        const payload = [];
        sinon.stub(helper, 'checkMcoaLineItemExists').resolves(null)
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/migrateMappingData').send(payload);
        expect(result['body'].status).toBe('Error validating payload');
    });


    test('#POST should publish migrated mapping lineItems returns error for wrong payload of array of objects', async () => {
        const payload = { migrationData: {} };
        sinon.stub(helper, 'checkMcoaLineItemExists').resolves(null)
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/migrateMappingData').send(payload);
        expect(result['body'].status).toBe('Error validating payload');
    });

    test('#POST should publish migrated mapping lineItems returns error for invalid base 64', async () => {
        const payload = { createdBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64.base64 };
        let parsedData: Array<Array<string>> = [
            ["propertyType", "productId", "subProductId", "sourceLineItem", "sourceLineItemHead", "chartOfAccountGroup", "code"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "000-000-000-000", "1.00"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "1.00"]]
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(parsedData)
        sinon.stub(helper, 'checkMcoaLineItemExists').resolves(null)
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/migrateMappingData').send(payload);
        expect(result['body'].invalidLineItemRows.length).toBe(1);
    });


    test('#POST should return sheet name validation error', async () => {
        const payload = { createdBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64.base64 };
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(undefined)
        const result = await Request(application).post('/mcoa-mapping-table/migrateMappingData').send(payload);
        expect(result['res'].statusCode).toBe(200);
        expect(result['body'].status).toBe('Sheet Name Validation Failed')
    });

    test('#POST should publish migrated mapping lineItems in array of objects successfully', async () => {
        const payload = migrateLineItems;
        sinon.stub(helper, 'checkMcoaLineItemExists').resolves(null)
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/migrateMappingData').send(payload);

        expect(JSON.stringify(result['body'])).toBe(JSON.stringify({
            result: "Successfully published the command",
            invalidLineItemRows: [
                {
                    propertyType: 'MultiFamily',
                    productId: 1,
                    subProductId: 'GPO',
                    sourceLineItem: "Rental Income 1",
                    sourceLineItemHead: 'GGGH',
                    chartOfAccountGroup: 'MIT',
                    code: '1.00'
                }
            ]
        }))

        expect(result['res'].statusCode).toBe(200);
    });

})

describe('updateMappedData', () => {
    const application: Application = fpMcoaService.app;

    afterAll(() => {
        fpMcoaService.server();
    })

    beforeAll(() => {
        sinon.restore()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should throw payload validating error', async () => {
        const payload = base64ToRemoveLineItems;
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/updateMappedData').send(payload);
        expect(result['res'].statusCode).toBe(400);
        expect(JSON.parse(result['res'].text).status).toBe('Error validating payload');
    })

    test('#POST should return sheet name validation error', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(undefined)
        const result = await Request(application).post('/mcoa-mapping-table/updateMappedData').send(payload);
        expect(result['res'].statusCode).toBe(400);
        expect(result['body'].status).toBe('Sheet Name Validation Failed')
    });

    it('should return invalidLineItemToRemove to be 2', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        let parsedData: Array<Array<string>> = [
            ["propertyType", "productId", "subProductId", "sourceLineItem", "sourceLineItemHead", "chartOfAccountGroup", "code", "proposedCode"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"]]
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(parsedData)
        sinon.stub(GenericMcoaParser.prototype, 'fetchLatestMcoaLineItemByMcoaCode').resolves([{
            mcoa_code: '1.00',
            mcoa_version: '1.0.0'
        }])
        sinon.stub(GenericMcoaParser.prototype, 'getMcoaCodes').resolves({})
        const result = await Request(application).post('/mcoa-mapping-table/updateMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToRemove.length).toBe(2);
    })

    it('should return invalidLineItemRowsToAdd to be 2', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        let parsedData: Array<Array<string>> = [
            ["propertyType", "productId", "subProductId", "sourceLineItem", "sourceLineItemHead", "chartOfAccountGroup", "code", ""],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"]]
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(parsedData)
        sinon.stub(GenericMcoaParser.prototype, 'fetchLatestMcoaLineItemByMcoaCode').resolves([{
            mcoa_code: '1.00',
            mcoa_version: '1.0.0'
        }])
        sinon.stub(GenericMcoaParser.prototype, 'getMcoaCodes').resolves({})
        const result = await Request(application).post('/mcoa-mapping-table/updateMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToAdd.length).toBe(2);
    })

    it('should return invalidLineItemToRemove to be 0', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        let parsedData: Array<Array<string>> = [
            ["propertyType", "productId", "subProductId", "sourceLineItem", "sourceLineItemHead", "chartOfAccountGroup", "code", "proposedCode"],
            ["MultiFamily", '1', "GPO", "Gross potential rent", "rental income", "MIT", "1.00", "2.00"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"]]
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(parsedData)
        sinon.stub(GenericMcoaParser.prototype, 'fetchLatestMcoaLineItemByMcoaCode').resolves([{
            mcoa_code: '2.00',
            mcoa_version: '1.0.0'
        }])
        sinon.stub(GenericMcoaParser.prototype, 'getMcoaCodes').resolves({
            '2.00': {
                mcoaCode: '2.00',
                mcoaVersion: '1.0.0'
            },
            '1.00': {
                mcoaCode: '2.00',
                mcoaVersion: '1.0.0'
            },
        })
        const result = await Request(application).post('/mcoa-mapping-table/updateMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToRemove.length).toBe(0);
    })
})

describe('removeMappedData with base 64 as input', () => {
    const application: Application = fpMcoaService.app;

    afterAll(() => {
        fpMcoaService.server();
    })

    beforeAll(() => {
        sinon.restore()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should throw payload validating error', async () => {
        const payload = base64ToRemoveLineItems;
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/removeMappedData').send(payload);
        expect(result['res'].statusCode).toBe(400);
        expect(JSON.parse(result['res'].text).status).toBe('Error validating payload');
    })

    test('#POST should return sheet name validation error', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(undefined)
        const result = await Request(application).post('/mcoa-mapping-table/removeMappedData').send(payload);
        expect(result['res'].statusCode).toBe(400);
        expect(result['body'].status).toBe('Sheet Name Validation Failed')
    });

    it('should return invalidLineItemToRemove to be 2', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        let parsedData: Array<Array<string>> = [
            ["propertyType", "productId", "subProductId", "sourceLineItem", "sourceLineItemHead", "chartOfAccountGroup", "code", "proposedCode"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"]]
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(parsedData)
        sinon.stub(GenericMcoaParser.prototype, 'fetchLatestMcoaLineItemByMcoaCode').resolves([{
            mcoa_code: '1.00',
            mcoa_version: '1.0.0'
        }])
        sinon.stub(GenericMcoaParser.prototype, 'getMcoaCodes').resolves({})
        const result = await Request(application).post('/mcoa-mapping-table/removeMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToRemove.length).toBe(2);
    })

    it('should return invalidLineItemToRemove to be 0', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', base64: base64ToRemoveLineItems.base64 };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        let parsedData: Array<Array<string>> = [
            ["propertyType", "productId", "subProductId", "sourceLineItem", "sourceLineItemHead", "chartOfAccountGroup", "code", "proposedCode"],
            ["MultiFamily", '1', "GPO", "Gross potential rent", "rental income", "MIT", "1.00", "2.00"],
            ["MultiFamily", '1', "GPO", "RI", "GGGH", "MIT", "1.00", "2.00"]]
        sinon.stub(ExcelFileReader.prototype, 'getExcelData').returns(parsedData)
        sinon.stub(GenericMcoaParser.prototype, 'fetchLatestMcoaLineItemByMcoaCode').resolves([{
            mcoa_code: '2.00',
            mcoa_version: '1.0.0'
        }])
        sinon.stub(GenericMcoaParser.prototype, 'getMcoaCodes').resolves({
            '2.00': {
                mcoaCode: '2.00',
                mcoaVersion: '1.0.0'
            },
            '1.00': {
                mcoaCode: '2.00',
                mcoaVersion: '1.0.0'
            },
        })
        const result = await Request(application).post('/mcoa-mapping-table/removeMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToRemove.length).toBe(0);
    })
})

describe('removeMappedData with remove mappging ids as input', () => {
    const application: Application = fpMcoaService.app;

    afterAll(() => {
        fpMcoaService.server();
    })

    beforeAll(() => {
        sinon.restore()
    })

    afterEach(() => {
        sinon.restore()
    })


    it('should return invalidLineItemToRemove to be 2', async () => {
        const payload = { requestedBy: 123, removeMappingIds: [1, 2] };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/removeMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToRemove.length).toBe(2);
    })

    it('should return invalidLineItemToRemove to be 0', async () => {
        const payload = { requestedBy: '5ac4c62e-1aa9-4317-82d4-2d14e769179a', removeMappingIds: ['5ac4c62e-1aa9-4317-82d4-2d14e769179a'] };
        sinon.stub(MappingTableParser.prototype, 'mapLineItems').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/removeMappedData').send(payload);
        expect(result['body'].invalidLineItemRowsToRemove.length).toBe(0);
    })
})

describe('upgradeMappingVersion with mcoa Code', () => {
    const application: Application = fpMcoaService.app;
    afterAll(() => {
        fpMcoaService.server();
    })

    beforeAll(() => {
        sinon.restore()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should return upgraded message', async () => {
        const payload = { requestedBy: "5ac4c62e-1aa9-4317-82d4-2d14e769179a", mcoaCode: [] };
        sinon.stub(GenericMcoaParser.prototype, 'getMasterData').resolves();
        sinon.stub(McoaQueries.prototype, 'updateMappingVersionByMcoaCode').resolves();
        const result = await Request(application).post('/mcoa-mapping-table/upgradeMappingVersion').send(payload);
        expect(result['statusCode']).toBe(403);
    })
})