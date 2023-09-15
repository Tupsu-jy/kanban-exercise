
# Kanban Exercise

This project is a demonstration of our Kanban Board application UI. It captures the core features and functionalities typical of platforms like Trello. The application is divided into two parts: a React-based frontend and a python backend API. They are run using Docker.


## Frontend:
The frontend of the Kanban Board is developed using React and offers a dynamic, user-friendly interface. It connects to psql database running on render. Smooth transitions are achieved by using optimistic updates to frontend state and then reverting should the backend update fail. Its demo version is running on https://kanban-exercise.onrender.com/ (it might be slow to start at the moment due to being on render in development mode)

Here's what the directory structure signifies:

src: This is where the main application logic resides.
- api: Configuration files related to API calls made from the frontend.
- assets: Contains static files like images.
- components: Reusable UI components such as columns, tasks, modals, and buttons.
- containers: Components connected to business logic or state.
- contexts: React context providers for managing global state and behavior.
- hooks: Custom React hooks providing specific functionalities like drag-and-drop.
- schemas: Data schemas and/or validation logic.
- style: Global styling for the application.

Webpack is used for bundling the application and other configuration-related files like package.json, yarn.lock, and webpack.config.js, manage dependencies and build processes.



## Backend:
The backend provides the necessary API endpoints to serve the frontend, ensuring seamless data flow and CRUD operations. The backend connects to a psql database on render and manages columns, tasks, users, and the relationships between them. It can be run as a docker container and it is currently running as such on https://kanban-backend-j6tc.onrender.com/ . 


#### The backend has the following models:

-   Task:
    -   id //uuid
    -   name
    -   assigned //array of assigned user ids to complete the task
    -   description //description of the assignment
    -   importance //integer from 0 to 2
-   Column:
    -   id
    -   task_ids //array of task ids that are attached to column
    -   name
-   User:
    -   name
    -   id

Its primary components include:

- requirements.txt: Lists all the dependencies required for the backend application.
- run.py: The main entry point to run the backend server.


Repo location:
https://github.com/Tupsu-jy/kanban-backend


## How to use
This exercise uses React, yarn, webpack and Docker. In order to run the project in your local environment **you need Docker installed** (https://docs.docker.com/engine/install/)
**and Docker Compose** (https://docs.docker.com/compose/install/)
- After Docker installed you first need to run command: **docker-compose build** (builds images for docker).
- To start exercise container: **docker-compose up** (now you are ready to edit the project, and the app can be accessed from localhost:9000)
- To stop container: docker-compose down
- To remove kanban-exercise image:
  - docker-compose down
  - docker images -a
  - Check the id of kanban-exercise_app.
  - docker rmi < ID of kanban-exercise_app >


When you to add npm packages you need to go to the app container: **docker exec -it kanban.exercise.com sh**
Now you can run yarn commands like: **yarn add < package-name >**

