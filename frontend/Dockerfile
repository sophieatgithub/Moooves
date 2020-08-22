FROM node as builder
COPY ./ /app
WORKDIR /app/react-app
RUN npm install
RUN npm run build

FROM php
COPY --from=builder /app /app
ENTRYPOINT ["php", "-sS", "0.0.0.0:8000", "-t", "/app/react-app/build"]
