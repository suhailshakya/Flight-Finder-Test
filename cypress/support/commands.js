import LoginPage from '../pages/LoginPage'; 

const lp = new LoginPage();

// ***********************************************
Cypress.Commands.add('validLoginFunc', () => {
    let emailVal;
    let amadeusKey;
    let amadeusSecret;
    //load the config file from fixture to read data
    cy.fixture('config').then((data) => {
        emailVal = data.email;
        cy.visit('http://localhost:62711');
        lp.getInputField().should('have.value', '');
        lp.getInputField().click();
        cy.readAPIKeys().then(() => {
            cy.getConfigValue('amadeusAPIKey').then((value) => {
                amadeusKey = value;
                cy.getConfigValue('amadeusSecret').then((value2) => {
                    amadeusSecret = value2;
    
                    //API test: Amadeus access token generation
                    cy.request({
                        method: 'POST',
                        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: {
                            grant_type: 'client_credentials',
                            client_id: amadeusKey,
                            client_secret: amadeusSecret
                        },
                        form: true
                    }).then((response) => {
                        expect(response.body).to.have.property('access_token');
                    });
                });
            });
        });
        lp.login(emailVal);
    });
})

//reading from txt and storing in env
Cypress.Commands.add('readAPIKeys', () => {
    cy.readFile('cypress/fixtures/keys.txt').then((txt) => {
        const lines = txt.split('\n');
        const kvp = {};

        //read line by line and store in map
        lines.forEach(ln => {
            const[key, value] = ln.split(' : ');
            if (key && value){
                kvp[key.trim()] = value.trim();
            }
        });
        //store map in env
        Cypress.env('config', kvp);
    });
})

//return key value pairs by accessing them from environment
Cypress.Commands.add('getConfigValue', (key) => {
    return Cypress.env('config')[key];
})