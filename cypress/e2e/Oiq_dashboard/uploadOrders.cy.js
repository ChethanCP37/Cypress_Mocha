/// <reference types='Cypress'/>

import { ORDERS } from '../../selector/orders';
import BU from '../../fixtures/BU.json';
import Helper from '../../e2e/utils/Helper';

const helper = new Helper();
let referenceCsvFile = 'referenceCsvFile.csv';
let getTodaysDate = helper.getTodaysDate(); // get today's date and store in getTodaysDate variable
let getTomorrowssDate = helper.getTomorrowsDate(); // get tomorrows's date and store in getTomorrowssDate variable
let getYesterdaysDate = helper.getYesterdaysDate(); // get tomorrows's date and store in getTomorrowssDate variable
let csvData;


describe('Upload Orders', () => {
    // Before start executing all it blocks
    before(() => {
        cy.login();
        cy.get(ORDERS.ORDER_ICON).click();
    });

    // Before start executing each it block
    // beforeEach(() => {
    //     cy.writeFile('cypress/fixtures/finalCsvToBeUploaded.csv', ''); // clears the file before each tests
    //     cy.writeFile('cypress/fixtures/referenceCsvFile.csv', ''); // clears the file before each tests

    // });

    // Order Container
    it('Validate if user navigated to orders page', () => {
        cy.url().should('include', '/#/client/' + BU.team.toLowerCase() + '/orders?');
    });

    // Upload CSV
    it('Upload orders and check its successful', () => {
        cy.task('log', 'first it block starting ');
        csvData = {
            orderId: 'OrderId_' + helper.getCurrentDateAndTimeInMiliseconds(),
            orderDate: getTomorrowssDate,
            homebaseExecutionDate: getTomorrowssDate,
            customerExecutionDate: getTomorrowssDate,
        }
        cy.task('updateCsvFile',(csvData));
        cy.get(ORDERS.ORDER_UPLOAD).click();
        cy.attachCsvFile('finalCsvToBeUploaded.csv');
        cy.validateToastMsg('Orders uploaded successfully');
        cy.log('Order is uploaded successfully  via csv file and orderId is ');
        // csvData = {};
    });

    it('Upload orders and check validation for past customer execution date ', () => {
        cy.task('log', 'second it block starting ');
        csvData = {
            orderId: 'OrderId_' + helper.getCurrentDateAndTimeInMiliseconds()+1,
            orderDate: getTomorrowssDate,
            homebaseExecutionDate: getYesterdaysDate,
            customerExecutionDate: getYesterdaysDate,
        }
        cy.task('updateCsvFile',(csvData));
        cy.get(ORDERS.ORDER_UPLOAD).click();
        cy.attachCsvFile('finalCsvToBeUploaded.csv');
        cy.validateToastMsg('Orders uploaded successfully');
        cy.log('Order is uploaded successfully  via csv file and orderId is ');
    });


    // After exection of all it blocks
    after(() => {
        // clear cookies and localStorage
        cy.clearCookies();
        cy.clearLocalStorage();
    });
});
