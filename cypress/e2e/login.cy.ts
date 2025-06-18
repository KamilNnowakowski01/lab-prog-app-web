/// <reference types="cypress" />

describe('Logowanie', () => {
  it('Should login user: admin@example.com.', () => {
    cy.login('admin@example.com', 'admin123')
    cy.contains('Welcome to ManagMe')
  })

  it('Should login and logout user: admin@example.com.', () => {
    cy.login('admin@example.com', 'admin123')
    cy.logout()
  })
})