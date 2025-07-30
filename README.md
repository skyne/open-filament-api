# OpenFilamentApi

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- npm

### Start the Full Stack Application

```sh
# Start everything (MongoDB + API + Frontend)
npm start

# Or step by step:
npm run docker:up     # Start MongoDB container
npm run dev          # Start both API and Frontend services
```

This will start:
- **MongoDB**: Running on `localhost:27017` (with authentication)
- **API Service**: Running on `localhost:3000`
- **Frontend**: Running on `localhost:4200`

### Individual Services

```sh
# Start just the API service
npx nx serve api-service

# Start just the frontend
npx nx serve frontend-web

# Build both projects
npm run build
```

### Docker Commands

```sh
# Start MongoDB container
npm run docker:up

# Stop and remove containers
npm run docker:down

# View MongoDB logs
npm run docker:logs

# Reset MongoDB data (removes all data!)
npm run docker:reset
```

## Environment Configuration

Copy `.env.example` to `.env` and configure the following variables:

### CORS Configuration
The API supports configurable CORS origins for cross-origin requests:
- `CORS_ORIGINS`: Comma-separated list of allowed origins (default: `http://localhost:4200`)
- Example: `CORS_ORIGINS=http://localhost:4200,http://localhost:3000,https://yourdomain.com`

### MongoDB Configuration
- `MONGO_URI`: Full MongoDB connection string with authentication
- `MONGO_HOST`: MongoDB host (default: localhost)
- `MONGO_PORT`: MongoDB port (default: 27017)
- `MONGO_DB`: Database name (default: filament_db)
- `MONGO_USER`: Database user (default: filament_user)
- `MONGO_PASSWORD`: Database password (default: filament_password)

### Other Configuration
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)

## Architecture

The project consists of:

- **API Service** (`apps/api-service`): Fastify-based REST API with MongoDB
- **Frontend Web** (`apps/frontend-web`): Next.js application consuming the API
- **Database**: MongoDB running in Docker with authentication

The frontend depends on the API service, ensuring proper build and deployment order.

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve api-service
```

To create a production bundle:

```sh
npx nx build api-service
```

To see all available targets to run for a project, run:

```sh
npx nx show project api-service
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
