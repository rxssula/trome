# Stage 1: Build the Node.js application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the project
RUN npm run build

# Stage 2: Set up the production image with Node.js and Python
FROM node:18-slim

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

# Copy the built Node.js app from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy Python scripts
COPY --from=build /app/src/python-scripts ./src/python-scripts

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Expose the necessary port
EXPOSE 3000

# Start the application
CMD ["node", "./dist/index.js"]
