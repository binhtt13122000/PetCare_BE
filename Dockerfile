FROM node:17.5.0-alpine3.15 as build
WORKDIR /tmp
COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn install
COPY src ./src
RUN yarn build
# RUN npx typeorm migration:run
FROM build as runner
RUN yarn add pm2 -g
WORKDIR /app
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /tmp/dist ./dist
COPY ecosystem.config.js ./ecosystem.config.js
ENV PORT=4000
EXPOSE 4000
ENTRYPOINT [ "npx","pm2","start","ecosystem.config.js","--no-daemon"]