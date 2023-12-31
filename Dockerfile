# этап сборки (build stage)
FROM node:lts-alpine as build-stage
WORKDIR /chat-ui
COPY . /chat-ui
RUN npm install

RUN npm run build


# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /chat-ui/dist /usr/share/nginx/html
COPY --from=build-stage /chat-ui/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]