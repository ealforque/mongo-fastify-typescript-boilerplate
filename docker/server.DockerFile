FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]