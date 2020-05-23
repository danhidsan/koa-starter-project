FROM node:12.16.3-alpine3.11

RUN apk add --update python make g++ && rm -rf /var/cache/apk/*

WORKDIR /app/src

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]