describe('Product CRUD Operations', () => {
    // Store productId and product data
    let productId = ''
    let productData = {}

    // Load product data from fixtures before running tests
    beforeEach(() => {
        cy.fixture('singleProduct').then((data) => {
            productData = data
        })
        cy.visit('/')
    })

    it('should add a new product and capture the ID', () => {
        // Add new product using data from fixtures
        cy.addProduct(productData.name, 
            productData.price, 
            productData.quantity)    

        // Capture and store productId for use in other tests
        cy.getIdFromNotification().then((id) => {
            productId = id
            cy.log(`Product added with ID: ${productId}`)
        })
    })

    it('should update the product quantity using same productId', () => {
        // Verify productId was captured
        expect(productId).to.not.be.empty
        cy.log(`Using productId: ${productId}`)

        // Update product with the stored ID
        cy.updateProduct(productId, 
            productData.updatedProduct.Name, 
            productData.updatedProduct.Price, 
            productData.updatedProduct.Quantity)

        // Verify update success
        cy.get('.notification').should('be.visible')
    })

    it('should delete the product using same productId', () => {
        // Verify productId was captured
        expect(productId).to.not.be.empty
        cy.log(`Using productId: ${productId}`)

        // Delete product with the stored ID
        cy.clickProductButton(productId, '.btn-delete')
        cy.get('#deleteModal button.btn-delete').click()

        // Verify deletion success
        cy.get('.notification').should('be.visible')
        cy.get('.notification').should('not.exist')
    })
})