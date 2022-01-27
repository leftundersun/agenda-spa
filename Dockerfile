# syntax=docker/dockerfile:1

FROM node:16.6.2-stretch

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD npm run serve