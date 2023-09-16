#base image with alias
FROM node:latest as build-step
ARG HOST_ENV=development
WORKDIR /app


#install angular cli to run build
RUN npm install -g @angular/cli

#run angular commands
COPY ./package.json .
RUN npm install
COPY . .
ENV HOST_ENV=$HOST_ENV
RUN ng build --configuration=${HOST_ENV}

#copying dist files onto nginx
#copy contents from other container with alias build-step
#onto to the specified path in the current container
FROM nginx as runtime
ENV VENDORS_API='http://vendor-api:8080'
COPY --from=build-step /app/dist/angular-rebloc /usr/share/nginx/html
