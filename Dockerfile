##stage build node 10
FROM node:10-alpine as build-stage

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

#stage production
FROM nginx:1.15.8-alpine as production-stage

# Copy build files to nginx html folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx config to nginx folder
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]