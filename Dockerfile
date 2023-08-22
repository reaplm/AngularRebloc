#base image with alias
FROM node:latest as build-step
WORKDIR /app


#install angular cli to run build
RUN npm install -g @angular/cli

#run angular commands
COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

#copying dist files onto nginx
#copy contents from other container with alias build-step
#onto to the specified path in the current container
FROM nginx as runtime
ENV VENDORS_API='http://vendor-api:8080'
COPY --from=build-step /app/dist/angular-rebloc /usr/share/nginx/html
