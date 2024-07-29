import LoginPage from '../pages/LoginPage'; 

const lp = new LoginPage();

// ***********************************************
Cypress.Commands.add('validLoginFunc', () => {
    let emailVal;
    cy.fixture('config').then((data) => {
        emailVal = data.email;
        cy.visit('http://localhost:62711');
        lp.getInputField().should('have.value', '');
        lp.getInputField().click();
        //API test: Amadeus access token generation
        // cy.request({
        //     method: 'POST',
        //     url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     body: {
        //       grant_type: 'client_credentials',
        //       client_id: '0GaQXyOsRAH9QjGjd0I4KhapyoF9ltbY',
        //       client_secret: '2HUfPg6RA693WJol'
        //     },
        //     form: true
        //   }).then((response) => {
        //     expect(response.body).to.have.property('access_token');
        // });
        lp.login(emailVal);
    });
})

Cypress.Commands.add('readAPIKeys', () => {
    cy.readFile('cypress/fixtures/keys.txt').then((txt) => {
        const lines = txt.split('\n');
        const kvp = {};

        lines.forEach(ln => {
            const[key, value] = ln.split(' : ');
            if (key && value){
                kvp[key.trim()] = value.trim();
            }
        });
        Cypress.env('config', kvp);
    });
})

Cypress.Commands.add('getConfigValue', (key) => {
    return Cypress.env('config')[key];
})