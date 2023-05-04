
FROM node:16.13.0

#Se asigna el usuario que ejecutará la aplicación
USER node

# Create app directory
WORKDIR /home/node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY imagen/package*.json ./
COPY imagen/tsconfig.json ./

RUN npm install -g npm@9.5.1

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY imagen .

ENV         TZ                America/Mexico_City
RUN         ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8080
CMD [ "npm", "start" ]