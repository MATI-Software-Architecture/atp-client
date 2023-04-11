const urlTest = 'http://localhost:3000/'

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(urlTest)
  })  

  it('Disconect Back', () => {
    cy.request('POST', 'http://localhost:8080/health/status', {'status': 'Not Ok!'})
    .then(response => {
      expect(response.status).to.eq(200)
    });
  })

  for(let i = 0; i < 10; i++) {
    it('Save product', () => {
      cy.contains('New Product').click()
      cy.get('#product').type('T1')
      cy.get('#price').type('100')
      cy.get('#date').type('1/1/2023')
      cy.get('#important').click()
      cy.get('#submit').click()
    })
  }

  it('Connect Back', () => {
    cy.request('POST', 'http://localhost:8080/health/status', {'status': 'Not Ok!'})
    .then(response => {
      expect(response.status).to.eq(200)
    });
  })

  it('Assert sync', () => {
    cy.request('GET', 'http://localhost:8080/health/status', {'status': 'Not Ok!'})
  })


  // cy.contains('Products').click()

  // cy.request('POST', 'http://localhost:8080/health/status', {'status': 'Ok!'})
  // .then(response => {
  //   expect(response.status).to.eq(200)
  // });
  
})