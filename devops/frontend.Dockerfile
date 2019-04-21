FROM node:10-alpine

WORKDIR /main
COPY ./public /main/public
COPY ./src /main/src
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./server/frontend.js /main/server/frontend.js

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "server/frontend.js"]