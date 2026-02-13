describe('Product CRUD Operations - Multiple Products (Data-Driven)', () => {
    // Store products from fixtures
    let products = []

    // Load product data from fixtures before running tests
    before(() => {
        cy.fixture('multipleProduct').then((data) => {
            products = data
        })
        cy.visit('/')
        cy.get('#productList > div').should('be.visible')
    })
    
    it('should complete CRUD workflow for each product', () => {
        // Iterate through each product in the fixture
        cy.wrap(products).each((product, index) => {
            // BEST PRACTICE: Declare productId inside loop for each product
            let productId = '' // Declare productId variable to store ID for each product during iteration
            
            cy.log(`\n========== Testing Product ${index + 1}/${products.length}: ${product.name} ==========`)

            // ===== ADD PRODUCT =====
            cy.log(`Adding product: ${product.name}`)
            cy.addProduct(product.name, product.price, product.quantity)

            // Capture productId - unique for each product
            cy.getIdFromNotification().then((id) => {
                productId = id
                cy.log(`✓ Product added successfully with ID: ${productId}`)

                // ===== UPDATE PRODUCT =====
                cy.log(`Updating product: ${product.name}`)
                cy.updateProduct(
                    productId,
                    product.updatedProduct.Name,
                    product.updatedProduct.Price,
                    product.updatedProduct.Quantity
                )

                // Verify update success
                cy.get('.notification').should('be.visible')
                cy.log(`✓ Product updated successfully`)

                // ===== DELETE PRODUCT =====
                cy.log(`Deleting product: ${product.updatedProduct.Name}`)
                cy.clickProductButton(productId, '.btn-delete')
                cy.get('#deleteModal button.btn-delete').click()

                // Wait for deletion notification to appear and then disappear
                cy.get('.notification').should('be.visible')
                cy.get('.notification').should('not.exist')
                cy.log(`✓ Product deleted successfully\n`)
            })
        })

        cy.log('========== All products tested successfully! ==========')
    })
})