export const LOGIN_FORM_SELECTORS = {
  CLIENT_ID: '[data-test-id="clientIdInput"]',
  BUTTON_CONTINUE: 'Continue',
  BUTTON_LOGIN: 'Login',
  USER_ID: '[label="User ID"]',
  PASSWORD: '[placeholder="Password"]',
  TEXT_WELCOME: 'Welcome',
  TEXT_LOGIN_WITH_OKTA: 'Login with OKTA',
  OKTA_USERNAME: "#okta-signin-username",
  OKTA_PASSWORD: "#okta-signin-password",
  OKTA_BUTTON_LOGIN: "#okta-signin-submit",
  TEXT_FORGET_PASSWORD: 'Forgot Password?',




  BUTTON_CLIENT_ID: '[data-test-id="button-continue-clientId"]',
  BUTTON_SSO: '[data-test-id="button-redirect-to-sso"]',
  BUTTON_PERSONNEL_ID: '[data-test-id="button-personnel-continue-to-login"]',
  
  BUTTON_LOGIN_CONNECTION: '[data-test-id="button-login-with-connection"]',
  

};

export const BU_TEAMS = {
  // need data-test-id, as of now hardcoded, might fail for new build due to dynamic suffix css selectors
  TEAM: '.BusinessUnitChip__label___Ski6r',
};
