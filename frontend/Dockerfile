FROM node as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM php
COPY --from=builder /app/build /app
ENTRYPOINT ["php", "-sS", "0.0.0.0:8000", "-t", "/app"]
