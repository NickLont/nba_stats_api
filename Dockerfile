## Specifying base image
FROM node:10

## Creating base dir
RUN mkdir -p /nbaStatsApi

## Globally install nodemon inside container
RUN npm install nodemon yarn -g

## Set base dir as working dir for Docker
WORKDIR /nbaStatsApi

## Copy and install packages
COPY package.json .
COPY yarn.lock .
RUN yarn install --silent
COPY . .

## Set environment to 'development'
ENV NODE_ENV development

## Allow PORT to be publically available
EXPOSE 3010

## run the application
CMD ["yarn", "start:docker"]
