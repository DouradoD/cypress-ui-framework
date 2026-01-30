/// <reference types="cypress" />

const API_BASE_URL = 'https://api.restful-api.dev/objects';

describe('POST /objects - Restful API', () => {
  let createdId: string;

  afterEach(() => {
    if (createdId) {
      cy.request('DELETE', `${API_BASE_URL}/${createdId}`);
    }
  });

  it('creates a new object and returns 200', () => {
    const newObject = {
      name: 'Test Object',
      data: {
        color: 'Blue',
        capacity: '64 GB',
      },
    };

    cy.request('POST', API_BASE_URL, newObject).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(newObject.name);
      expect(response.body.data).to.deep.include(newObject.data);
      createdId = response.body.id;
    });
  });

  it('creates object with null data', () => {
    const newObject = {
      name: 'Object with null data',
      data: null,
    };

    cy.request('POST', API_BASE_URL, newObject).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(newObject.name);
      expect(response.body.data).to.be.null;
      createdId = response.body.id;
    });
  });
});
