FROM node:14-alpine AS base

RUN . /etc/profile && \
    apk add --update curl bash sudo git
WORKDIR /code
COPY bin bin
RUN chmod u+x /code/bin/add-berkadia-certificates-to-repo && /code/bin/add-berkadia-certificates-to-repo
RUN npm config set registry http://polaris-npm.berkadia.com/
ENV NODE_EXTRA_CA_CERTS="/tmp/berk-ca-certs/berkadia-ca.crt"
RUN chmod u+x /code/bin/set-npm-registry
RUN bin/set-npm-registry
COPY package.json ./
RUN npm install
COPY . .
FROM base as builder
ENV NODE_ENV production
RUN npm run build
CMD ["node", "./dist"]