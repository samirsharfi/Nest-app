# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install the application dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app will run on (default for NestJS is 3000)
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start:prod"]
