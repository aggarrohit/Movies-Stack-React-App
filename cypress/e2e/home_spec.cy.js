

describe('search movie and login to get favourite and watch later movies', () => {
  

  it('login box should be present', () => {
    cy.visit('http://localhost:3000/')
    // cy.get('button').should('contain.text','click here')
    cy.findByText('Login').should('exist')
    cy.findByText('Login').should('be.disabled')
    cy.get("input[placeholder=\"username\"]").type('aggarrohit')
    cy.get("input[placeholder=\"password\"]").type('!Qaz@Wsx')
    cy.findByText('Login').should('not.be.disabled')
    cy.findByText('Login').click()
    
  })


  it('movies should be searched', () => {
    cy.visit('http://localhost:3000/')
    cy.get("input[placeholder=\"search movies..\"]").type("the pursuit of happyness");
    cy.findByText(/the pursuit of happyness/i).should('exist')
  })


})