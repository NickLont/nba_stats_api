## Specifying base image
FROM node:10

## Creating base dir
RUN mkdir /nbaStatsApi

## Set base dir as working dir for Docker
WORKDIR /nbaStatsApi

## Copy and install packages
COPY ./package.json /nbaStatsApi/package.json
COPY ./package-lock.json /nbaStatsApi/package-lock.json
RUN npm i --silent
COPY . /nbaStatsApi/

## Set environment to 'development'
ENV NODE_ENV development

## Allow PORT to be publically available
EXPOSE 3010

## run the application
CMD npm start
