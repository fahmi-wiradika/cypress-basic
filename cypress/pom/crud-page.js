/**
 * Product CRUD Page Object Model
 * Encapsulates all interactions with the product CRUD page
 */
class ProductPage {
    // Selectors
    selectors = {
        productName: '#productName',
        productPrice: '#productPrice',
        productQuantity: '#productQuantity',
        addBtn: 'button.btn-primary',
        productList: '#productList > div',
        deleteModal: '#deleteModal',
        updateModal: '#updateModal',
        deleteModalBtn: '#deleteModal button.btn-delete',
        updateModalBtn: '#updateModal button.btn-update',
        notification: '.notification',
        updateName: '#updateName',
        updatePrice: '#updatePrice',
        updateQuantity: '#updateQuantity',
        btnUpdate: '.btn-update',
        btnDelete: '.btn-delete',
    }

    /**
     * Visit the product page
     */
    visit() {
        cy.intercept('GET', '/api/products').as('getProducts')
        cy.visit('/')
        cy.wait('@getProducts', { timeout: 10000 }).its('response.body').should('be.an', 'array')
        cy.get(this.selectors.productList).should('exist').and('be.visible')
    }

    /**
     * Add a new product
     * @param {string} name - Product name
     * @param {string|number} price - Product price
     * @param {string|number} quantity - Product quantity
     */
    addProduct(name, price, quantity) {
        cy.get(this.selectors.productName).type(name)
        cy.get(this.selectors.productPrice).type(price)
        cy.get(this.selectors.productQuantity).type(quantity)
        
        cy.intercept('POST','/api/products').as('addProduct')
        cy.get(this.selectors.addBtn).click()
        cy.wait('@addProduct', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    }

    /**
     * Get the product ID from the notification message
     * @returns {Cypress.Chainable<string>} The product ID
     */
    getProductIdFromNotification() {
        return cy.get(this.selectors.notification)
            .invoke('text')
            .then((text) => {
                return text.match(/Product ID:\s*([a-f0-9]+)/i)[1]
            })
    }

    /**
     * Update a product by its ID
     * @param {string} productId - The product ID to update
     * @param {string} newName - New product name
     * @param {string|number} newPrice - New product price
     * @param {string|number} newQuantity - New product quantity
     */
    updateProduct(productId, newName, newPrice, newQuantity) {
        this.clickProductButton(productId, this.selectors.btnUpdate)
        
        if (newName) {
            cy.get(this.selectors.updateName).clear().type(newName)
        }
        if (newPrice) {
            cy.get(this.selectors.updatePrice).clear().type(newPrice)
        }
        if (newQuantity) {
            cy.get(this.selectors.updateQuantity).clear().type(newQuantity)
        }
        
        cy.intercept('PUT','/api/products/*').as('updateProduct')
        cy.get(this.selectors.updateModalBtn).click()
        cy.wait('@updateProduct', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
        
    }

    /**
     * Delete a product by its ID
     * @param {string} productId - The product ID to delete
     */
    deleteProduct(productId) {
        this.clickProductButton(productId, this.selectors.btnDelete)
        cy.intercept('DELETE','api/products/*').as('deleteProduct')
        cy.get(this.selectors.deleteModalBtn).click()
        cy.wait('@deleteProduct',{ timeout: 10000 }).its('response.statusCode').should('eq', 200)
    }

    /**
     * Click a button within a product row identified by productId
     * @param {string} productId - The product ID
     * @param {string} buttonClass - The CSS class of the button to click
     */
    clickProductButton(productId, buttonClass) {
        cy.contains(this.selectors.productList, productId)
            .within(() => {
                cy.get(buttonClass).click()
            })
    }

    /**
     * Wait for and verify notification visibility
     * @returns {Cypress.Chainable<Element>} The notification element
     */
    verifyNotificationVisible() {
        return cy.get(this.selectors.notification).should('be.visible')
    }

    /**
     * Wait for notification to disappear
     * @returns {Cypress.Chainable<Element>}
     */
    waitNotificationToDisappear() {
        return cy.get(this.selectors.notification).should('not.exist')
    }

    /**
     * Verify product list is loaded and visible
     * @returns {Cypress.Chainable<Element>}
     */
    verifyProductListLoaded() {
        return cy.get(this.selectors.productList).should('exist').and('be.visible')
    }

    /**
     * Assert product details by identifier
     * @param {string} identifier - Unique identifier to locate the product
     * @param {Object} expectedValues - Expected values for assertions
     */
    assertProductDetails(identifier, expectedValues){
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
    }}

export default new ProductPage()