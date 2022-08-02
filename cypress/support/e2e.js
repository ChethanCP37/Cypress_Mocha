// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')

// Coverage
import '@cypress/code-coverage/support';

//To upload the file 
import 'cypress-file-upload';

//Mouse events
//Refer this link for more details : https://github.com/dmtrKovalenko/cypress-real-events
import "cypress-real-events/support";

// uncaught application error: turned off
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
