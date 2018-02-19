# Create image based on the official Node 6 image from dockerhub
FROM node:9

# Create a directory where our app will be placed
# RUN is the command you use to run terminal commands. the -p: Create parent directories 
# as necessary. When this option is specified, no error is reported if a directory already exists.
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory. WORKDIR = cd.
# If we don't set this, the default is /
WORKDIR /usr/src/app

# We are only copying the dist folder
COPY package.json /usr/src/app
COPY Main.js /usr/src/app
COPY dist /usr/src/app/dist

# Install dependecies
# RUN npm install -g pm2
RUN npm install

EXPOSE 4200

# Serve the app
CMD ["node", "Main.js"]