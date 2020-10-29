FROM node:12-alpine3.11

WORKDIR /usr/app

RUN npm install --global yarn

RUN yarn -v

COPY . WORKDIR

EXPOSE 3005

CMD [ "yarn", "dev:server"]
