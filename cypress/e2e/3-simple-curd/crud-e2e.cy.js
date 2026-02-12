it('my first test', () => {
    // expect(true).to.equal(true)
    cy.visit('/')
    
    // Add new product
    cy.get('#productName').type('Bakso Malang');
    cy.get('#productPrice').type('15000');
    cy.get('#productQuantity').type('2');
    cy.get('button.btn-primary').click();

    // Extract product ID once after adding
    cy.getIdFromNotification().then((productId) => {
        // Update product
        cy.clickProductButton(productId, '.btn-update')
        cy.get('#updateQuantity').type('3');
        cy.get('#updateModal button.btn-update').click();

        // Delete product
        cy.clickProductButton(productId, '.btn-delete')
        cy.get('#deleteModal button.btn-delete').click();
    })
})