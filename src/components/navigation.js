import React from "react";
import { Link } from "react-router-dom";

const items = [
    {id: 1, title: 'Home', url: '/'},
    {id: 2, title: 'Products', url: '/products'},
    {id: 3, title: 'New Product', url: '/products/new'},
]

export default function Navigation() {
    return (
        <div className="justify-center">
            <div className="flex justify-center items-center py-8">
                <ul className="flex flex-wrap items-center justify-center mb-6 text-gray-900 dark:text-white">
                    {items.map((nav) => (
                        <li key={nav.id}>
                            <Link className="bg-indigo-300 px-4 py-1 rounded-md mr-4 hover:underline md:mr-6" to={nav.url}>{nav.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
