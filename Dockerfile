FROM node:8.11.1

WORKDIR /usr/src/home-service-api

COPY ./ ./

RUN npm install 

CMD ["/bin/bash"]