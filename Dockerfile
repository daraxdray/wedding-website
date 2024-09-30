FROM node:current-alpine

LABEL org.opencontainers.image.title = "The Wedding Platform" \
        org.opencontainers.image.description = "This is a special website build for people's wedding"\
        org.opencontainers.image.authors="@damilola"

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app


RUN npm install --legacy-peer

ENTRYPOINT [ "npm","run","start" ]