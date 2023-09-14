# Kanban Exercise

This project is a demonstration of our Kanban Board application UI. It captures the core features and functionalities typical of platforms like Trello. The application is divided into two parts: a React-based frontend and a python backend API. They are orchestrated using Docker and can be started together using docker-compose.


## Frontend:
The frontend of the Kanban Board is developed using React and offers a dynamic, user-friendly interface. It connects to psql database running on render. Smooth transitions are achieved by using optimistic updates to frontend state and then reverting should the backend update fail.

Here's what the directory structure signifies:

src: This is where the main application logic resides.
- api: Configuration files related to API calls made from the frontend.
 - assets: Contains static files like images.
- components: Reusable UI components such as columns, tasks, modals, and buttons.
- 	containers: Components connected to business logic or state.
- 	contexts: React context providers for managing global state and behavior.
- 	hooks: Custom React hooks providing specific functionalities like drag-and-drop.
- 	schemas: Data schemas and/or validation logic.
- 	style: Global styling for the application.

Webpack is used for bundling the application and other configuration-related files like package.json, yarn.lock, and webpack.config.js manage dependencies and build processes.



#### Backend:
The backend provides the necessary API endpoints to serve the frontend, ensuring seamless data flow and CRUD operations. Its primary components include:

requirements.txt: Lists all the dependencies required for the backend application.
run.py: The main entry point to run the backend server.
The backend connects to a psql database on render and manages columns, tasks, users, and the relationships between them.

Location:
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

You will also need to add an environment variable for BASE_URL=https://kanban-backend-j6tc.onrender.com so that connection to backend works.

When you to add npm packages you need to go to the app container: **docker exec -it kanban.exercise.com sh**
Now you can run yarn commands like: **yarn add < package-name >**

