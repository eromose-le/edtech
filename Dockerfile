# Step 1: Use an official Node.js image as a base
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the TypeScript code
RUN npm run build

# Step 7: Expose the port that the app will run on
EXPOSE 5000

# Step 8: Run the application
CMD ["node", "dist/server.js"]
