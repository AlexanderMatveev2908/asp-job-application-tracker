FROM node:20 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.2 --activate
RUN echo "nodeLinker: node-modules" > .yarnrc.yml

COPY . .

ARG ENV_MODE
ARG BACK_URL_DEV
ARG BACK_URL
ARG FRONT_URL_DEV
ARG FRONT_URL
ARG SMPT_FROM

RUN yarn install

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]
