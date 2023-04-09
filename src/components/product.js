import React from "react";
import { Link } from "react-router-dom";

export function Item({product}) {
    return (
        <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.content}</p>
            <p>{product.date}</p>
            <p>{product.important ? "Important" : "Not Important"}</p>
        </div>
    );
};

export function List({products}) {
    if (products.length === 0) {
        return <h2>No products found</h2>;
    } else {
        return products.map(product => (
            <div key={product._id}>
                <h2>
                    <Link to={`/products/${product._id}`}>{product.title}</Link>
                </h2>
            </div>
        ));
    }
};