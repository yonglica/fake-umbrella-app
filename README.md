# Fake Umbrella application

The Fake Umbrella application is composed of four components:
<ol>
<li>Front end: built with Angular 9 </li>
<li>Back end: build with nestjs 7</li>
<li>Database: Mongo 4.4</li>
<li>Cache: Redis 6 </li>
</ol>

## Local Execution

After cloning code to local, run `docker compose up` under local application folder. After docker containers and services started, navigate to `http://localhost:4200/`

## prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Fake Umbrella api
While the application is running, open a browser and navigate to `http://localhost:3000/api`. You should see the Swagger UI. A Json format api document can be access at `http://localhost:3000/api-json`.

## Performace Test
[Artillery](https://artillery.io/) is used as a load testing tool for Fake umbrella api. To execute a load test, 
- Installation 
  ```bash
  $ npm install -g artillery
  ```

- Start Fake umbrella api
  ```bash
  $ npm run start
  ```

- Execute test configurations in backend/performance folder
  ```bash
  $ artillery run -e dev forecast-retrieval.yml
  $ artillery run -e dev customer-operations.yml
  $ artillery run -e dev customer-retrieval.yml
  ``` 
  