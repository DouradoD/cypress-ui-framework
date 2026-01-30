/// <reference types="cypress" />

const API_BASE_URL = 'https://api.restful-api.dev/objects';

describe('DELETE /objects/:id - Restful API', () => {
  it('deletes object and returns 200', () => {
    cy.request('POST', API_BASE_URL, {
      name: 'Object to Delete',
      data: { color: 'Blue' },
    }).then((response) => {
      const createdId = response.body.id;
      cy.request('DELETE', `${API_BASE_URL}/${createdId}`).then(
        (deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        }
      );
    });
  });

  it('returns 404 when getting deleted object', () => {
    cy.request('POST', API_BASE_URL, {
      name: 'Object to Delete',
      data: { color: 'Blue' },
    }).then((response) => {
      const createdId = response.body.id;
      cy.request('DELETE', `${API_BASE_URL}/${createdId}`);
      cy.request({
        method: 'GET',
        url: `${API_BASE_URL}/${createdId}`,
        failOnStatusCode: false,
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404);
      });
    });
  });
});
