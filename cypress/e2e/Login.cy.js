import LoginPage from '../pages/LoginPage';
const lp = new LoginPage();

describe('home page - login access tests', () => {
  //valid login
  it.only('valid login', () => {
    cy.validLoginFunc();
    cy.location('pathname').should('include', 'CitySelection');
  });

  it('invalid login with alert', () => {
    lp.getInputField().should('have.value', '');
    lp.getInputField().click();
    cy.on('window:alert', (alrText) => { //listen for alert event
      //once the alert is activated, run assertion
      expect(alrText).to.contains('Invalid input')
    });
    lp.login('wrong email'); //should trigger the alert event
  })

})