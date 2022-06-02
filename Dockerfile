FROM node:17.5.0-alpine3.15 as build
WORKDIR /tmp
COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn
COPY src ./src
RUN yarn build
# RUN npx typeorm migration:run
FROM build as runner
RUN yarn global add pm2
ENV PM2_PUBLIC_KEY x06lax0605icnzx
ENV PM2_SECRET_KEY 4wgkli3lr8sc3i9
WORKDIR /app
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /tmp/dist ./dist
COPY ecosystem.config.js ./ecosystem.config.js
ENV PORT=4000
EXPOSE 4000
ENTRYPOINT [ "pm2-runtime","ecosystem.config.js","--no-daemon"]

# FROM node:17.5.0-alpine3.15 as build
# WORKDIR /tmp
# COPY package*.json ./
# COPY tsconfig*.json ./
# RUN yarn install
# COPY src ./src
# RUN yarn build

# FROM build as runner

# COPY --from=build /tmp/node_modules ./node_modules
# COPY --from=build /tmp/dist ./dist
# COPY ecosystem.config.js ./ecosystem.config.js
# CMD ["node", "dist/main"]