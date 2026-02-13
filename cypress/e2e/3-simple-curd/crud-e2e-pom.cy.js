import ProductPage from '../../pom/crud-page.js'

describe('Product CRUD Operations', () => {
    // Store productId and product data
    let productId = ''
    let productData = {}

    // Load product data from fixtures before running tests
    beforeEach(() => {
        cy.fixture('singleProduct').then((data) => {
            productData = data
        })
        ProductPage.visit()
        ProductPage.verifyProductListLoaded()
    })

    it('should add a new product and capture the ID', () => {
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
        })
    })

    it('should update the product quantity using same productId', () => {
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
    })

    it('should delete the product using same productId', () => {
        // Verify productId was captured
        expect(productId).to.not.be.empty
        cy.log(`Using productId: ${productId}`)

        // Delete product with the stored ID
        ProductPage.deleteProduct(productId)

        // Verify deletion success
        ProductPage.verifyNotificationVisible()
        ProductPage.waitNotificationToDisappear()
    })
})