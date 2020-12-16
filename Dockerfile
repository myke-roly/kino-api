# FROM node:12.13.0

# WORKDIR /usr/src/app

# COPY package*.json ./
# COPY tsconfig.json ./

# COPY ./src ./src

# RUN npm install

# EXPOSE 8080

# CMD ["node", "./dist/index.js"]

FROM node:12.18.3

WORKDIR /usr/src/app/


COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]

