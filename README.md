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

## Fake Umbrella api
While the application is running, open a browser and navigate to `http://localhost:3000/api`. You should see the Swagger UI. A Json format api document can be access at `http://localhost:3000/api-json`.


## prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
