# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:22.3.0

# Create and change to the app directory.
WORKDIR /pdfgen-node

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "server.js" ]
