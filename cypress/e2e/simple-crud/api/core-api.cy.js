describe('Core API', () => {

    let productId = ''
    let productData = {}
    before(() => {
        cy.fixture('singleProduct').then((data) => {
            productData = data
        })
    })
    

    it('should get all products', () => {
        cy.request('GET', `/api/products`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should create a new product', () => {
        cy.request('POST', `/api/products`, {
            name: productData.name,
            quantity: productData.quantity,
            price: productData.price
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            productId = response.body._id
        })
    })

    it('should get a product by id', () => {
        cy.request('GET', `/api/products/${productId}`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.name).to.eq(productData.name)
            expect(response.body.quantity).to.eq(productData.quantity)
            expect(response.body.price).to.eq(productData.price)
        })
    })

    it('should update a product', () => {
        cy.request('PUT', `/api/products/${productId}`, {
            price: productData.updatedProduct.Price
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.price).to.eq(productData.updatedProduct.Price)
        })
    })
    it('should delete a product', () => {
        cy.request('DELETE', `/api/products/${productId}`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.message).to.eq('Product deleted successfully')
        })
    })

    it('should get product by id not found', () => {
        cy.request('GET', `/api/products/${productId}`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.message).to.eq('Product not found')
        })
    })
})