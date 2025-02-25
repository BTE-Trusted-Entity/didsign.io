FROM node:22.14.0 as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
