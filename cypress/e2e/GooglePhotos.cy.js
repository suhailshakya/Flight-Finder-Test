
describe('Google Photos Test', () => {
    let apiKey;
    let parsedCity;

    beforeEach(() => {
        cy.validLoginFunc();
    });

    it.only('testing cities API', () => {
        cy.wait(2000);
        cy.contains('p', ',').as('city');
        //retrive element and invoke to use as js object
        cy.get('@city').invoke('text').then((text) => {
            let parsedValue = text.split(',');
            parsedCity = parsedValue[0];
            if (parsedCity.includes('NSW')){
                parsedCity = 'Sydney';
            }
            if (parsedCity.includes('VIC')){
                parsedCity = 'Melbourne'
            }
            if (parsedCity.includes('44600')){
                parsedCity = 'Kathmandu'
            }
            cy.getConfigValue('googlePhotoKey').then((value) => {
                apiKey = value;

                //API test: Google Photos for list of cities
                cy.request({
                    method: 'GET',
                    url: `https://maps.googleapis.com/maps/api/place/textsearch/json`,
                    qs: {
                        query: parsedCity,
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