FROM node:22-alpine

WORKDIR /app

COPY package.json .
RUN npm install --production

COPY index.js calculator.js ./

EXPOSE 8000

CMD ["node", "index.js"]
