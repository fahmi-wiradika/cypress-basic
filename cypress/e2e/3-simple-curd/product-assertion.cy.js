import ProductPage from '../../pom/crud-page.js'

describe('Product Assertions', () => {
    let products = []

    before(() => {
        // BEST PRACTICE: Load test data from fixtures
        cy.fixture('products').then((data) => {
            products = data
        })
        ProductPage.visit()
        ProductPage.verifyProductListLoaded()
    })

    it('Assert Product Details', () => {
        // Assert each product's details
        products.forEach(product => {
            ProductPage.assertProductDetails(product.identifier, product.assertions)
        })
    })

  })