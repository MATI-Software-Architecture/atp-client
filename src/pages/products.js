import { Item, List } from "../components/product";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UpdateStatus } from '../components/ping';

export function Products({ db }) {
    const [products, setProducts] = useState([]);
    UpdateStatus(db);

    useEffect(()=>{
        db.getAll().then(data => {
            if(data){
                setProducts(data)
            }
        });
    }, [db]);

    if (products.length === 0) {
        return <h2>No products found</h2>;
    } else {
        return <List products={products} />;
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
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} />
                </div>
                <div>
                    <label>Content</label>
                    <input type="text" name="content" value={product.content} onChange={e => setProduct({ ...product, content: e.target.value })} />
                </div>
                <div>
                    <label>Date</label>
                    <input type="text" name="date" value={product.date} onChange={e => setProduct({ ...product, date: e.target.value })} />
                </div>
                <div>
                    <label>Important</label>
                    <input type="checkbox" name="important" value={product.important} onChange={e => setProduct({ ...product, important: e.target.value })} />
                </div>
                <button type="submit">Save</button>
                <Link to="/products">Cancel</Link>
            </form>
        </div>
    );
}