/// <reference types="cypress" />

const API_BASE_URL = 'https://api.restful-api.dev/objects';

describe('PATCH /objects/:id - Restful API', () => {
  let createdId: string;

  beforeEach(() => {
    cy.request('POST', API_BASE_URL, {
      name: 'Object to Patch',
      data: { color: 'Red', capacity: '128 GB' },
    }).then((response) => {
      createdId = response.body.id;
    });
  });

  afterEach(() => {
    if (createdId) {
      cy.request('DELETE', `${API_BASE_URL}/${createdId}`);
    }
  });

  it('partially updates object and returns 200', () => {
    const partialUpdate = {
      name: 'Patched Object Name',
    };

    cy.request('PATCH', `${API_BASE_URL}/${createdId}`, partialUpdate).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(createdId);
        expect(response.body.name).to.eq(partialUpdate.name);
        expect(response.body.data).to.exist;
        expect(response.body.data.color).to.eq('Red');
      }
    );
  });
});
