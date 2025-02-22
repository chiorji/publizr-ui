FROM node:22.13.0-alpine AS builder
LABEL MAINTAINER="chigbogu.orji<chigboguorji@outlook.com>"

ENV YARN_VERSION=1.22.21

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn policies set-version "$YARN_VERSION" && yarn install

COPY . .

# RUN yarn lint && yarn build
RUN yarn build


FROM nginx:1.25.4-alpine

# Copy static build from the dist directory into nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]