it('my second test', () => {
    cy.visit('/')
    
    const products = [
        {
            identifier: '6911b85be57d001e5a03735f',
            assertions: {
                name: 'Ketoprak',
                price: 'IDR 18.000,00',
                quantity: 'Qty: 3'
            }
        },
        {
            identifier: 'Martabak',
            assertions: {
                id: '6671a89f4683bd7fea685662',
                price: 'IDR 38.000,00',
                quantity: 'Qty: 1'
            }
        },
        {
            identifier: 'IDR 125.000,00',
            assertions: {
                id: '66715895853abca66176d03a',
                name: 'Pizza',
                quantity: 'Qty: 2'
            }
        }
    ]

    products.forEach(product => {
        cy.assertProductDetails(product.identifier, product.assertions)
    })
})