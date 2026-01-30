/// <reference types="cypress" />

const API_BASE_URL = 'https://api.restful-api.dev/objects';

describe('PUT /objects/:id - Restful API', () => {
  let createdId: string;

  beforeEach(() => {
    cy.request('POST', API_BASE_URL, {
      name: 'Object to Update',
      data: { color: 'Red' },
    }).then((response) => {
      createdId = response.body.id;
    });
  });

  afterEach(() => {
    if (createdId) {
      cy.request('DELETE', `${API_BASE_URL}/${createdId}`);
    }
  });

  it('updates object and returns 200', () => {
    const updatedObject = {
      name: 'Updated Object Name',
      data: {
        color: 'Green',
        capacity: '256 GB',
      },
    };

    cy.request('PUT', `${API_BASE_URL}/${createdId}`, updatedObject).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(createdId);
        expect(response.body.name).to.eq(updatedObject.name);
        expect(response.body.data).to.deep.include(updatedObject.data);
      }
    );
  });
});
