# Create image based on the official Node 9 image from the dockerhub
FROM node:9

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app
COPY Shared /usr/src/Shared

# Install dependencies
RUN npm install -g pm2
RUN npm install
RUN npm run tsc

# Expose the port the app runs in
EXPOSE 3000

ENV NODE_ENV production

# Serve the app
CMD ["pm2-docker", "Main.js"]