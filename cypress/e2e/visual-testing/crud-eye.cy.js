import ProductPage from '../../pom/crud-page.js'

describe('Visual Testing', () => {
    let productId = ''
    let productData = {}

    beforeEach(() => {
        cy.fixture('singleProduct').then((data) => {
            productData = data
        })
        cy.eyesOpen({
            appName: 'Simple Crud app',
            testName: Cypress.currentTest.title,
        })
        ProductPage.visit()
        ProductPage.verifyProductListLoaded()
    });

    it('CRUD Process Visual Testing with Appli Tool', () => {
        // Add new product using data from fixtures
        ProductPage.addProduct(
            productData.name,
            productData.price,
            productData.quantity
        )

        // Capture and store productId for use in other tests
        ProductPage.getProductIdFromNotification().then((id) => {
            productId = id
            cy.log(`Product added with ID: ${productId}`)

            ProductPage.verifyNotificationVisible()
            ProductPage.waitNotificationToDisappear()
            cy.eyesCheckWindow({
                tag: "Product added"
            });
    
            // Verify productId was captured
            expect(productId).to.not.be.empty
            cy.log(`Using productId: ${productId}`)
        
            // Update product with the stored ID
            ProductPage.updateProduct(
                productId,
                productData.updatedProduct.Name,
                productData.updatedProduct.Price,
                productData.updatedProduct.Quantity
            )
        
            // Verify update success
            ProductPage.verifyNotificationVisible()
            ProductPage.waitNotificationToDisappear()
            cy.eyesCheckWindow({
                tag: "Product updated"
            });
        
            
            // Verify productId was captured
            expect(productId).to.not.be.empty
            cy.log(`Using productId: ${productId}`)
        
            // Delete product with the stored ID
            ProductPage.deleteProduct(productId)
        
            // Verify deletion success
            ProductPage.verifyNotificationVisible()
            ProductPage.waitNotificationToDisappear()
            cy.eyesCheckWindow({
                tag: "Product deleted"
            });
        


        })

        
    })

    afterEach(() => {
        cy.eyesClose()
    });
})