FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . .

RUN npm run build && cp package*.json ./dist/ && cd ./dist/ && npm ci --production 
# TODO remove tests from dist


FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./

EXPOSE 3001

CMD ["node", "app.js"]