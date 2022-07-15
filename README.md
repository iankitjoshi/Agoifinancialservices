
### Installation
To install the project locally first clone the project from git repo by running the following command:

#### Branches
1. master (Production)
2. stage (Staging)
3. dev (Development)

Go to the appropriate branch and run the following command to install all the required dependencies automatically.

`npm install`

Before running the project in development mode rename the `example.env` to `.env` file and put all the required values to run development server locally.

`REACT_APP_API_URL=<backend server url must be here>`
e.g.
`REACT_APP_API_URL=https://www.your-backend-server-url.com`

Once all set run the following command to start the server locally.

`npm start` or `npm run dev`

### Builds

To create devlopment build simply run `npm run build` it will create a development build.

If Staging or Production build is required first you need to setup the .env.staging for staging or .env.production for production build.

Once all set create a staging build by running `npm run build:stage` and production build by running `npm run build:prod`.

### Development
To start working on features or bugs create a new branch which depicts the current task. For example if it a bug then the branch name should start with prefix `bug`. if its a feature then the branch name should start with prefix `feature`.
i.e.

in case of bug fixing
`git checkout -b bug-login-validation-fix`
in case of feature
`git checkout -b feature-integrate-hubspot`

### Deployment

To deploy the bug or feature create a MR/PR to dev branch, once its reviewed on dev you further need to create a MR/PR to staging and same goes for the production.

Reviewer will revew and perform approprites tests. Once passed by the reviewer to code will be deployed to the front-end server automatically.