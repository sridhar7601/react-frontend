# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the dist directory to the Nginx html directory
COPY ./dist /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
