FROM node:12-alpine3.11

WORKDIR /usr/app

COPY ./package.json WORKDIR

RUN yarn

EXPOSE 3005

CMD [ "yarn", "dev:server"]
