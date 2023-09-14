FROM node:14-alpine
WORKDIR /app
COPY ./app/package.json ./
COPY ./app/yarn.lock ./
RUN yarn install
COPY ./app .
EXPOSE 9000
CMD ["yarn", "start"]



