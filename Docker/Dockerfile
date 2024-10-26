FROM node:16 as BUILDER

WORKDIR /app
COPY package*.json ./

RUN apt-get update && \ apt-get upgrade -y && \ npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/build /usr/shar/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx" , "-g" , "daemon off;"]