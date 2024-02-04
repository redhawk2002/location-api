FROM node:18-alpine

#creating a app dir

WORKDIR /MAPSENSE

#install app dependencies

COPY package*.json ./

#run npm install

RUN npm install

#bundle app source

COPY . .

EXPOSE 4000

CMD ["npm","run", "dev"]