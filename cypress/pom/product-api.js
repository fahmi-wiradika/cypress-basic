export class ProductApi {
    static getAllProducts() {
        return cy.request('GET', '/api/products')
    }
    static getProductById(id) {
        return cy.request('GET', `/api/products/${id}`)
    }
    static createProduct(product) {
        return cy.request('POST', '/api/products', product)
    }
    static updateProduct(id, product) {
        return cy.request('PUT', `/api/products/${id}`, product)
    }
    static deleteProduct(id) {
        return cy.request('DELETE', `/api/products/${id}`)
    }
}