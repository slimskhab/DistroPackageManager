FROM node:14

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

COPY frontend/dist ./frontend/dist

EXPOSE 5001

CMD ["npm", "run", "dev"]
