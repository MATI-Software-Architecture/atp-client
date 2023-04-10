import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

export default class DB {
    constructor() {
        this.db = new PouchDB("products");
        this.db.createIndex({index: { fields: ['type'] }})
            .catch(err => {console.log(err);});
    }

    async getAll() {
        const docs = this.db.allDocs({ include_docs: true })
        .then(docs => docs.rows.map(row => row.doc))
        .catch(error => {
            console.log('error', error);
            return []
        });
        return docs;
    }

    async getByType(type) {
        const docs = this.db.find({ selector: { type: type } })
        .then(docs => docs.docs)
        .catch(error => {
            console.log('error', error);
            return []
        });
        return docs;
    }

    async getUnsync() {
        const docs = this.db.find({ selector: { sync: false } })
        .then(docs => docs.docs)
        .catch(error => {
            console.log('error', error);
            return []
        });
        return docs;
    }

    async getItem(id) {
        const doc = this.db.get(id)
        .then(doc => doc)
        .catch(error => {
            console.log('error', error);
            return {};
        });
        return doc;
    }

    async addItem(item) {
        const doc = this.db.post(item)
        .then(doc => doc)
        .catch(error => {
            console.log('error', error);
            return {};
        });
        return doc;
    }

    async updateItem(product) {
        const doc = this.db.get(product._id)
        .then(async doc => {
            product._rev = doc._rev;
            try {
                return await this.db.put(product);
            } catch (error) {
                console.log('error', error);
                return {};
            }
        })
        .then(doc => doc)
        .catch(async err => {
            console.log('error', err);
            try {
                return await this.db.put(product);
            } catch (error) {
                console.log('error', error);
                return {};
            }
        });
        return doc;
    }

    async deleteItem(product) {
        const doc = this.db.remove(product)
        .then(doc => doc)
        .catch(error => {
            console.log('error', error);
            return {};
        });
        return doc;
    }
}