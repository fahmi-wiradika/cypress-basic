import ProductPage from '../../../pom/crud-page.js'

describe('Product CRUD Operations', () => {
    
    it('mocks API responses for product operations', () => {
        cy.task('sendNotification')
        // Mock GET products response
        cy.intercept('GET', '/api/products', {
            statusCode: 200,
            body: [
                { _id: '123541231234', name: 'Mocked Product 1', price: 10, quantity: 5 },
                { _id: '354132123123', name: 'Mocked Product 2', price: 20, quantity: 3 }
            ]
        }).as('getProducts')

        cy.intercept('POST', '/api/products', {
            statusCode: 200,
            body: { _id: 'newproductid123', name: 'New Mocked Product', price: 15, quantity: 10 }
        }).as('addProduct')

        cy.visit('/')
        cy.wait('@getProducts').its('response.body').should('have.length', 2)
        
        ProductPage.addProduct('New Mocked Product', 15, 10)
        cy.wait('@addProduct').its('response.body').should('include', { name: 'New Mocked Product', price: 15, quantity: 10 })

        cy.intercept('GET', '/api/products', {
            statusCode: 200,
            body: [
                { _id: '123541231234', name: 'Mocked Product 1', price: 10, quantity: 5 },
                { _id: '354132123123', name: 'Mocked Product 2', price: 20, quantity: 3 },
                { _id: 'newproductid123', name: 'New Mocked Product', price: 15, quantity: 10 }
            ]
        }).as('getProducts')
        cy.visit('/')




 
})
})