/// <reference types="cypress" />

const API_BASE_URL = 'https://api.restful-api.dev/objects';

describe('GET /objects - Restful API', () => {
  it('returns 200 and list of objects', () => {
    cy.request('GET', API_BASE_URL).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('returns objects with expected structure (id, name, data)', () => {
    cy.request('GET', API_BASE_URL).then((response) => {
      const objects = response.body;
      expect(objects).to.be.an('array');

      objects.forEach((obj: { id: string; name: string; data: unknown }) => {
        expect(obj).to.have.property('id');
        expect(obj).to.have.property('name');
        expect(obj).to.have.property('data');
        expect(obj.id).to.be.a('string');
        expect(obj.name).to.be.a('string');
      });
    });
  });

  it('returns Google Pixel 6 Pro with correct data', () => {
    cy.request('GET', API_BASE_URL).then((response) => {
      const pixel = response.body.find((obj: { id: string }) => obj.id === '1');
      expect(pixel).to.exist;
      expect(pixel.name).to.eq('Google Pixel 6 Pro');
      expect(pixel.data).to.deep.include({
        color: 'Cloudy White',
        capacity: '128 GB',
      });
    });
  });

  it('returns object with null data (Apple iPhone 12 Mini)', () => {
    cy.request('GET', API_BASE_URL).then((response) => {
      const iphone = response.body.find((obj: { id: string }) => obj.id === '2');
      expect(iphone).to.exist;
      expect(iphone.name).to.include('Apple iPhone 12 Mini');
      expect(iphone.data).to.be.null;
    });
  });

  it('returns single object by id', () => {
    cy.request('GET', `${API_BASE_URL}/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.eq('1');
      expect(response.body.name).to.eq('Google Pixel 6 Pro');
      expect(response.body.data).to.deep.include({
        color: 'Cloudy White',
        capacity: '128 GB',
      });
    });
  });

  it('returns 404 for non-existent object', () => {
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/99999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
