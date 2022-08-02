// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login custom command
import { LOGIN_FORM_SELECTORS, BU_TEAMS } from "../selector/login";
import BU from "../fixtures/BU.json";
import { ORDERS } from "../selector/orders";

Cypress.Commands.add("login", () => {
  const url = Cypress.env("url"),
    username = Cypress.env("username"),
    password = Cypress.env("password"),
    clientID = Cypress.env("clientID"),
    oktaUsername = Cypress.env("oktaUsername"),
    oktaPassword = Cypress.env("oktaPassword"),
    bu = BU.team;

  cy.visit(url);
  cy.task('log', 'Navigate to url: ' + url);
  cy.get(LOGIN_FORM_SELECTORS.CLIENT_ID).clear().type(clientID);
  cy.task('log', 'Entered clientId: ' + clientID);
  cy.contains(LOGIN_FORM_SELECTORS.BUTTON_CONTINUE).click();
  cy.contains(LOGIN_FORM_SELECTORS.BUTTON_LOGIN).click();
  cy.get(LOGIN_FORM_SELECTORS.USER_ID, { timeout: 10000 }).type(username);
  cy.task('log', 'Entered username: ' + username);
  cy.contains(LOGIN_FORM_SELECTORS.BUTTON_CONTINUE).click();
  cy.contains(LOGIN_FORM_SELECTORS.TEXT_WELCOME, { timeout: 10000 }).should('be.visible');
  cy.get('body').then(($body) => {
    if ($body.text().includes(LOGIN_FORM_SELECTORS.TEXT_LOGIN_WITH_OKTA)) {
      cy.contains(LOGIN_FORM_SELECTORS.TEXT_LOGIN_WITH_OKTA, { timeout: 5000 }).click();
      cy.get(LOGIN_FORM_SELECTORS.OKTA_USERNAME, { timeout: 5000 }).type(oktaUsername);
      cy.get(LOGIN_FORM_SELECTORS.OKTA_PASSWORD, { timeout: 5000 }).type(oktaPassword);
      cy.get(LOGIN_FORM_SELECTORS.OKTA_BUTTON_LOGIN, { timeout: 5000 }).click();
    }
    else if ($body.text().includes(LOGIN_FORM_SELECTORS.TEXT_FORGET_PASSWORD, { timeout: 5000 })) {
      cy.get(LOGIN_FORM_SELECTORS.PASSWORD, { timeout: 5000 }).type(password);
      cy.contains(LOGIN_FORM_SELECTORS.BUTTON_LOGIN).click();
    }
  });
});

//Logout of the dashboard
Cypress.Commands.add('logout', () => {
  // cy.contains('Sign Out').click({force:true}); // OR we can use realHover()
  cy.get('.UserMenuIcon__accountIcon___EnuVP').realHover();
  cy.contains('Sign Out', { timeout: 3000 }).should('be.visible').click();
  cy.contains('Client ID').should('be.visible'); // Validation after logout of application
  cy.task('log', 'Successfully logged out of the dashboard');
});

//Clicks on Refresh button present on dashboard
Cypress.Commands.add('refresh', () => {
  cy.get('[data-test-id=refresh]').should('be.visible').click();
});

Cypress.Commands.add('clickEllipsis', () => {
  cy.get(COMMON_SELECTORS.BUTTON_ELLIPSE).click();
});

//Click on status tab; Ex: Open, Parked, Assigned, etc...
Cypress.Commands.add('clickOnStatusTab', (tabName) => {
  cy.contains(tabName).should('be.visible').click();
});

//Validate the toast message displayed on bottom RHS of the dashboard screen
Cypress.Commands.add('validateToastMsg', infoMsg => {
  cy.contains(infoMsg, { timeout: 5000 }).should(($ele) => {
    expect($ele.text()).to.equal(infoMsg);
  });
});

//apply filter
Cypress.Commands.add('applyFilter', (fieldName, value) => {
  cy.get('p').contains(fieldName, { timeout: 5000 }).siblings('.css-1u8pvn2').type(value);
  cy.get(COMMON_SELECTORS.BUTTON_APPLY_ALL, { timeout: 5000 }).click();
  cy.get(ORDERS.ORDER_ORDER_ID_COLUMN, { timeout: 5000 }).should('be.visible'); // Waiting to display tabular grids on the page
});


//Attach file
Cypress.Commands.add('attachCsvFile', (finalCsvToBeUploaded) => {
  cy.contains(ORDERS.ORDER_DRAG_DROP_FILE).attachFile(finalCsvToBeUploaded, { subjectType: 'drag-n-drop' })
});

Cypress.Commands.add('updateCsvFile', (fileName, csvData) => {
  let updatedJSON, orderIds = [];
  cy.readFile("cypress/fixtures/" + fileName)
    .then((data) => {
      cy.task('csvToJson', data)
        .then(finalJsonArray => {
          cy.log(finalJsonArray); // CSV converted to json object

          //Logic to update json objects; for loop to update csv columns in json array
          for (let i = 0; i < (finalJsonArray.length); i++) {
            if ('orderId' in csvData) {
              orderIds[i] = csvData.orderId;
              finalJsonArray[i]['Order ID'] = csvData.orderId;
            }
            else {
              orderIds[i] = 'OrderId_' + this.getCurrentDateAndTimeInMiliseconds();
              finalJsonArray[i]['Order ID'] = orderIds[i];
            }

            if ('orderDate' in csvData) {
              finalJsonArray[i]['Order Date'] = csvData.orderDate;
            }
            if ('homebaseExecutionDate' in csvData) {
              finalJsonArray[i]['Homebase Execution Date'] = csvData.homebaseExecutionDate;
            }
            if ('customerExecutionDate' in csvData) {
              finalJsonArray[i]['Customer Execution Date'] = csvData.customerExecutionDate;
            }
          }

          updatedJSON = finalJsonArray;
          cy.task('finalCsv', updatedJSON);
        })
    })
});