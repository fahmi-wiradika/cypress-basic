describe('Product Assertions', () => {
    let products = []

    before(() => {
        // BEST PRACTICE: Load test data from fixtures
        cy.fixture('products').then((data) => {
            products = data
        })
        cy.visit('/')
    })

    it('Assert Product Details', () => {
        // Assert each product's details
        products.forEach(product => {
            cy.assertProductDetails(product.identifier, product.assertions)
        })
    })

  })