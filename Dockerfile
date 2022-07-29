FROM node:14

WORKDIR /app
COPY . .

RUN npm install
RUN mkdir uploads1

EXPOSE 8000
CMD ["node ","app.js"]
