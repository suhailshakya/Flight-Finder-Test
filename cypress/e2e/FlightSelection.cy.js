
describe('Flight selection properties', () => {
let citiesList;
let apiKey;

    beforeEach(() => {
        cy.fixture('config').then((data) => {
            citiesList = data.cities;
        });
        cy.readAPIKeys();
        cy.validLoginFunc();
    });

    it.only('testing cities API', () => {
        cy.wait(2000);
        cy.getConfigValue('googlePhotoKey').then((value) => {
            apiKey = value;

            citiesList.forEach((ct) => {
                cy.request({
                    method: 'GET',
                    url: `https://maps.googleapis.com/maps/api/place/textsearch/json`,
                    qs: {
                        query: ct,
                        key: apiKey
                    }
                }).then((response) => {
                    if (response.status !== 400) {
                        expect(response.status).to.equal(200);
                        expect(response.body.results[0].photos[0]).to.have.property('photo_reference');
                    }
                });
            });
        });
        cy.contains('button', 'Get new city').click();
    });

})