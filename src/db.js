import PouchDB from "pouchdb";

export default class DB {
    constructor() {
        this.db = new PouchDB("products");
    }

    async getProducts() {
        const docs = await this.db.allDocs({ include_docs: true })
        return docs.rows.map(row => row.doc);
    }

    async getProduct(id) {
        const doc = await this.db.get(id);
        return doc;
    }

    async addProduct(product) {
        return await this.db.post(product);
    }

    async updateProduct(product) {
        return await this.db.put(product);
    }

    async deleteProduct(product) {
        return await this.db.remove(product);
    }
}