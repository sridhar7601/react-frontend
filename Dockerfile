# Step 1: Build React App with Vite
FROM node:alpine3.18 as build

# Set working directory
WORKDIR /app 

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:1.23-alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
