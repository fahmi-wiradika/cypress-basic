import ProductPage from '../../../pom/crud-page.js'

describe('Product CRUD Operations - Multiple Products (Data-Driven)', () => {
    // Store products from fixtures
    let products = []

    // Load product data from fixtures before running tests
    before(() => {
        cy.fixture('multipleProduct').then((data) => {
            products = data
        })
        ProductPage.visit()
    })
    
    it('should complete CRUD workflow for each product', () => {
        ProductPage.verifyProductListLoaded()
        // Iterate through each product in the fixture
        cy.wrap(products).each((product, index) => {
            // BEST PRACTICE: Declare productId inside loop for each product
            let productId = '' // Declare productId variable to store ID for each product during iteration

            cy.log(`\n========== Testing Product ${index + 1}/${products.length}: ${product.name} ==========`)

            // ===== ADD PRODUCT =====
            cy.log(`Adding product: ${product.name}`)
            ProductPage.addProduct(product.name, product.price, product.quantity)
            ProductPage.verifyNotificationVisible()

            // Capture productId - unique for each product
            ProductPage.getProductIdFromNotification().then((id) => {
                productId = id
                cy.log(`✓ Product added successfully with ID: ${productId}`)

                // ===== UPDATE PRODUCT =====
                cy.log(`Updating product: ${product.name}`)
                ProductPage.updateProduct(
                    productId,
                    product.updatedProduct.Name,
                    product.updatedProduct.Price,
                    product.updatedProduct.Quantity
                )

                // Verify update success
                ProductPage.verifyNotificationVisible()
                cy.log(`✓ Product updated successfully`)

                // ===== DELETE PRODUCT =====
                cy.log(`Deleting product: ${product.updatedProduct.Name}`)
                ProductPage.deleteProduct(productId)

                // Wait for deletion notification to appear and then disappear
                ProductPage.verifyNotificationVisible()
                ProductPage.waitNotificationToDisappear()
                cy.log(`✓ Product deleted successfully\n`)
            })
        })

        cy.log('========== All products tested successfully! ==========')
    })
})