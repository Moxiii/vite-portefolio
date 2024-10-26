FROM node:16 as BUILDER

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=BUILDER /app/dist /usr/shar/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx" , "-g" , "daemon off;"]