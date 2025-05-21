# Dockerfile
FROM node:22.14.0

# Set working directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .


# Expose port
EXPOSE 8081

CMD [ "node", "index.js" ]
