FROM nginx:1.24

RUN apt-get update && apt-get install wget unzip -y

ARG version

RUN wget "https://github.com/Solidwave/BYBE-frontend/releases/download/${version}/build.zip"

RUN unzip /build.zip

EXPOSE 80

RUN cp -r /build/* /usr/share/nginx/html
