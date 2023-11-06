FROM node:16 As Production

ENV NODE_ENV=production

WORKDIR /user/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install


COPY . .

# Expose the port that your application is running on
EXPOSE 8000


CMD ["npm","run","prod"]