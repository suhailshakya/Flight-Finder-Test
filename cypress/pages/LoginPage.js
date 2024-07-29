import selectors from '../selectors/Selectors.js';

class LoginPage {
    getInputField() {
        return cy.get(selectors.login.inputField);
    }

    getAuthButton() {
        return cy.get(selectors.login.authButton);
    }

    login(emailVal){
        this.getInputField().type(emailVal);
        this.getAuthButton().click();
    }
}

export default LoginPage;