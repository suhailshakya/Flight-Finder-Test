import FlightSelectionPage from '../pages/FlightSelectionPage';
const fsp = new FlightSelectionPage();

describe('Flight selection properties test', () => {
    context('Test invalid flight property selections', () => {
        beforeEach(() => {
            cy.validLoginFunc();
        });

        it('invalid location selection', () => {
            //prepare to intercept the alert
            cy.on('window:alert', (alrText) => { 
                console.log('Alert message:', alrText);
                expect(alrText).to.contains('departure');
            });
            //click the button to trigger the intercept
            cy.contains('button', 'Get Flight Info').click();
        });

        it.only('invalid date selection', () => {
            cy.on('window:alert', (alrText) => { 
                console.log('Alert message:', alrText);
                expect(alrText).to.contains('depart date cannot be set after the return');
            });
            cy.get('input[name*="DepartDate"]').then(($input) => {
                const selectedDate = $input.val();
                const dateObject = new Date(selectedDate);
                //Add 3 days to current date
                dateObject.setDate(dateObject.getDate() + 3);
                const newDate = dateObject.toISOString().split('T')[0];
                cy.log('Current Date:', selectedDate);
                //set new date
                cy.log('New Date:', newDate);
                cy.get('input[name*="DepartDate"]').type(newDate);
                cy.get('input[name*="DepartDate"]').should('have.value', newDate);
            })
            fsp.preCheckout();
            //trigger alert
            cy.contains('button', 'Get Flight Info').click();
        });
    });

    context('Test for valid flight property selections', () => {
        beforeEach(() => {
            cy.validLoginFunc();
        })

        it('valid selections', () => {
            fsp.preCheckout();
            cy.contains('button', 'Get Flight Info').click();
            cy.location('pathname').should('include', 'TicketItinerary');
        })
    });
});