// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom commands for product operations
Cypress.Commands.add('getIdFromNotification', () => {
    return cy.get('.notification')
        .invoke('text')
        .then((text) => {
            return text.match(/Product ID:\s*([a-f0-9]+)/i)[1]
        })
})

Cypress.Commands.add('clickProductButton', (productId, buttonClass) => {
    cy.contains('#productList > div', productId)
        .within(() => {
            cy.get(buttonClass).click()
        })
})

Cypress.Commands.add('addProduct', (name, price, quantity) => {
    cy.get('#productName').type(name)
    cy.get('#productPrice').type(price)
    cy.get('#productQuantity').type(quantity)
    cy.get('button.btn-primary').click()
})

Cypress.Commands.add('updateProduct', (productId, newName, newPrice, newQuantity) => {
    cy.clickProductButton(productId, '.btn-update')
    if (newName) {
        cy.get('#updateName').clear().type(newName)
    }
    if (newPrice) {
        cy.get('#updatePrice').clear().type(newPrice)
    }
    if (newQuantity) {
        cy.get('#updateQuantity').clear().type(newQuantity)
    }
    cy.get('#updateModal button.btn-update').click()
})

Cypress.Commands.add('assertProductDetails', (identifier, expectedValues) => {
    cy.contains('#productList > div', identifier).within(() => {
        if (expectedValues.id) {
            cy.get('.product-id').should('have.text', expectedValues.id)
        }
        if (expectedValues.name) {
            cy.get('.product-name').should('have.text', expectedValues.name)
        }
        if (expectedValues.price) {
            cy.get('.product-price').should('have.text', expectedValues.price)
        }
        if (expectedValues.quantity) {
            cy.get('.product-quantity').should('have.text', expectedValues.quantity)
        }
    })
})