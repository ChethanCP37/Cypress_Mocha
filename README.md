## Cypress Project Setup

Cypress framework is a JavaScript based end-to-end testing framework built on top of Mocha (feature-rich JavaScript test framework running on and in the browser) is used in the project and VSCode as an editor.

#### **1. Install Latest VS Code**
Install the latest VS code from the website : https://code.visualstudio.com/download

#### **2. Clone Project**
1. Create cypress folder in your local machine and navigate to the cypress folder
2. Download the project from git repository to cypress folder created on your local system : https://github.com/...

#### **3. Install Node**
1. Open the terminal from VS Code; Terminal > New Terminal > Navigate to Cypress folder created
2. Install nodejs on your system from the link: https://nodejs.org/en/download/

    **Note:** More info to install the node : https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/
3. To ensure node.js has been installed, run **node -v** in your terminal - you should get something like v17.5.0 *(version is at the time of writing readme.md file)*

#### **4. Install Dependencies & Extensions**
1. Open the terminal from VS Code; Terminal > New Terminal > Navigate to Cypress folder created
2. Download npm depndencies using the command **npm install**
3. Check whether cypress installed or not using **npx cypress --version** if not the install cypress using **npx cypress install**

#### **5. Config File Changes**
Add the required values in *cypress.env.json* file

    "url": "https://test.com/",
    "username": "yourPassword",
    "password": "password",
    "clientID": "clientId",
    "oktaUsername":"yourOktaUsn",
    "oktaPassword":"yourOktaPwd"


#### **6. Run Test Cases**
1. Open the terminal from VS Code; Terminal > New Terminal > Navigate to Cypress folder created
2. Use **npx cypress open** so that test runner opens and select the required .cy.js file to run
            OR
    Use **cypress run --headed --browser chrome** 
