FROM node:alpine

#set working directory
WORKDIR /app

# add app
COPY package*.json ./

RUN npm install

EXPOSE 3000

#start app
CMD ["npm", "start"] 