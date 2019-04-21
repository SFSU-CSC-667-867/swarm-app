FROM node:10-alpine

WORKDIR /main
COPY ./server/gateway.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 4000

CMD ["node", "gateway.js"]