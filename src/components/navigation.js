import React from "react";
import { Link } from "react-router-dom";

const items = [
    {id: 1, title: 'Home', url: '/'},
    {id: 2, title: 'Products', url: '/products'},
    {id: 3, title: 'New Product', url: '/products/new'},
]

export default function Navigation() {
    return (
        <nav className="navBar">
            <ul>
                {items.map((nav) => (
                    <li key={nav.id}>
                        <Link to={nav.url}>{nav.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
