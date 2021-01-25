FROM node
WORKDIR /fake-umbrella-app/frontend
RUN npm install -g @angular/cli@9.1.13
COPY package*.json ./
RUN npm install
COPY . .
