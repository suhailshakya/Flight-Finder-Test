import selectors from '../selectors/Selectors.js';

class FlightSelectionPage {
    getRadioValue() {
        return cy.get(selectors.flightSelection.departureCity);
    }

    preCheckout(){
        this.getRadioValue().click();
    }
}

export default FlightSelectionPage;