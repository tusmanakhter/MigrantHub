FROM node:8

WORKDIR /usr/src/app
EXPOSE 3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .
CMD [ "npm", "start" ]