FROM node:14.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build
