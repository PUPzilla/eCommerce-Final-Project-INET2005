import React, { useState, useEffect, useMemo } from "react";
import { useCookies } from 'react-cookie';
import Card from '../ui/card';

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const apiHost = import.meta.env.VITE_API_HOST;

    // Read cookies
    const [cookies] = useCookies(['cartItems']);

    // Safely calculate productIdArray using useMemo to avoid unnecessary re-calculations
    const productIdArray = useMemo(() => {
        if (cookies.cartItems && typeof cookies.cartItems === 'string') {
            return cookies.cartItems
                .split(',')
                .map(id => parseInt(id, 10))
                .filter(id => !isNaN(id));
        }
        return [];
    }, [cookies.cartItems]);

    // Create an object to store the quantity of each product ID
    const productQuantities = useMemo(() => {
        return productIdArray.reduce((acc, productId) => {
            acc[productId] = (acc[productId] || 0) + 1;
            return acc;
        }, {});
    }, [productIdArray]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const fetchedProducts = await Promise.all(
                    Object.keys(productQuantities).map(async (productId) => {
                        const response = await fetch(`${apiHost}/api/products/${productId}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch product with ID: ${productId}`);
                        }
                        const product = await response.json();
                        return { ...product, quantity: productQuantities[productId] };
                    })
                );
                setProducts(fetchedProducts);
                setError(null);
            } catch (err) {
                setError("An error occurred while fetching products.");
                console.error(err);
            }
        }

        if (productIdArray.length > 0) {
            fetchProducts();
        }
    }, [productIdArray, productQuantities, apiHost]);

    const totalCost = useMemo(() => {
        return products.reduce((total, product) => {
            return total + (product.cost * product.quantity);
        }, 0).toFixed(2);
    }, [products]);

    return (
        <>
            <div>
                <h1>Cart Page</h1>
                <h2>Products in Cart</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.product_id}>
                            <Card key={product.product_id} product={product} apiHost={apiHost} showLinks={false}/>
                            <p>Quantity: {product.quantity}</p>
                            <p>Total: ${product.cost * product.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available in your cart.</p>
                )}
            </div>
            <div>
                <h3>Total Cost: ${totalCost}</h3>
            </div>
        </>
    );
}
