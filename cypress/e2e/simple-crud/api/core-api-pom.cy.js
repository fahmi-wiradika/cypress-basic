import { ProductApi } from '../../../pom/product-api.js'

describe('Simple CRUD API', () => {

    let productId = ''
    let productData = {}
    before(() => {
        cy.fixture('singleProduct').then((data) => {
            productData = data
        })
    })

    it('should get all products', () => {
        ProductApi.getAllProducts().then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should create a new product', () => {
        ProductApi.createProduct({
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
        ProductApi.getProductById(productId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.name).to.eq(productData.name)
            expect(response.body.quantity).to.eq(productData.quantity)
            expect(response.body.price).to.eq(productData.price)
        })
    })

    it('should update a product', () => {
        ProductApi.updateProduct(productId, {
            quantity: productData.updatedProduct.Quantity
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.quantity).to.eq(productData.updatedProduct.Quantity)
        })
    })
    
    it('should delete a product by id', () => {
        ProductApi.deleteProduct(productId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.message).to.eq('Product deleted successfully')
        })
    })
    
    it('should get product by id not found', () => {
        ProductApi.getProductById(productId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.message).to.eq('Product not found')
        })
    })
    
})