import BU from '../../fixtures/BU.json';

describe('Login into Locus dashboard', () => {
    before(() => {
        //login funtion is added in coomands.js file
        cy.login();
    });
    after(() => {
      // clear cookies and localStorage
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    it('Login and validate the landing page URL', () => {
        cy.url().should('include', Cypress.env('url'));
        cy.title().should('include', 'Live View');
        cy.url().should('include', '/#/client/' + BU.team.toLowerCase() + '/live_view/');
        cy.location('protocol').should('include', 'https:');
        cy.task('log', 'Successfully logged into the dashboard')
    });
});
