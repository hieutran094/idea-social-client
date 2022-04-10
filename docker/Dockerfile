# buid production code
FROM node:12.22-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

# Nginx config

FROM nginx:alpine as production-build

COPY /nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5055

# replace PORT in nginx.conf file by real PORT of Heroku then run Nginx
RUN sed -i -e 's/$PORT/'"5055"'/g' /etc/nginx/nginx.conf

COPY /entrypoint.sh .

# RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]