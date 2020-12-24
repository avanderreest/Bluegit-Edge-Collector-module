FROM node

WORKDIR /app/

COPY package.json .
COPY package-lock.json .

RUN npm install  --production

COPY . .

EXPOSE 9229

USER node

CMD ["node", "--inspect=0.0.0.0:9229", "app.js"]