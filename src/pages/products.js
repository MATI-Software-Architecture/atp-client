import { Item, List } from "../components/product";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UpdateStatus } from '../components/ping';

export function Products({ db }) {
    const [products, setProducts] = useState([]);
    UpdateStatus(db);

    useEffect(()=>{
        db.getByType('product').then(data => {
            if(data){
                setProducts(data)
            }
        });
    }, [db]);

    if (products.length === 0) {
        return <h2>No products found</h2>;
    } else {
        return (
            <div>
                <h2>Products</h2>
                <List products={products} />
            </div>
        );
    }
}

export function Product( {db} ) {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    UpdateStatus(db);

    useEffect(()=>{
        db.getItem(id).then((data) => {
            if(data && data.type === 'product'){setProduct(data)}
        });
    }, [db, id]);

    if (!product) {
        return <h2>Product not found</h2>;
    } else {
        return <Item product={product}/>;
    }
}

export function New({ db }) {
    const navigate = useNavigate();
    UpdateStatus(db);
    const [product, setProduct] = useState({
        title: '',
        content: '',
        date: '',
        type: 'product',
        sync: false,
        important: true
    });

    const handleSubmit = e => {
        e.preventDefault();
        db.addItem(product).then((data) => {
            if(data.id){
                navigate(`/products/${data.id}`)
            }
        });
    }

    return (
        <div>
            <h2>New Product</h2>
            <form onSubmit={handleSubmit}>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium dark:text-white">Product</label>
                    <input id="product" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="title" value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium dark:text-white">Price</label>
                    <input id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="content" value={product.content} onChange={e => setProduct({ ...product, content: e.target.value })} />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium dark:text-white">Date</label>
                    <input id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="date" value={product.date} onChange={e => setProduct({ ...product, date: e.target.value })} />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium dark:text-white">Important</label>
                    <input id="important" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="checkbox" name="important" value={product.important} onChange={e => setProduct({ ...product, important: e.target.value })} />
                </div>
                <button id="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Save</button>
                <Link class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/products">Cancel</Link>
            </div>
            </form>
        </div>
    );
}