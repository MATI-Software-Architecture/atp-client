import React from "react";
import { Link } from "react-router-dom";

export function Item({product}) {
    return (
        <div key={product.id}>
            <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div class="flex flex-col pb-3">
                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Product</dt>
                    <dd class="text-lg font-semibold">{product.title}</dd>
                </div>
                <div class="flex flex-col pb-3">
                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Price</dt>
                    <dd class="text-lg font-semibold">{product.content}</dd>
                </div>
                <div class="flex flex-col pb-3">
                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date</dt>
                    <dd class="text-lg font-semibold">{product.date}</dd>
                </div>
                <div class="flex flex-col pb-3">
                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Type</dt>
                    <dd class="text-lg font-semibold">{product.important ? "Important" : "Not Important"}</dd>
                </div>
            </dl>
        </div>
    );
};

export function List({products}) {
    if (products.length === 0) {
        return <h2>No products found</h2>;
    } else {
        return products.map(product => (
            <div className="py-1" >
                <div className="bg-indigo-600 px-4 py-1 rounded-md mr-4 hover:underline md:mr-6" key={product._id}>
                    <h2>
                        <Link key={product._id} to={`/products/${product._id}`}>{product.title}</Link>
                    </h2>
                </div>
            </div>
            
        ));
    }
};