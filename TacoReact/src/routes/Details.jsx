import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Details() {
    
    //  Display product description

    const { id } = useParams();
    const [error, setError] = useState(null);
    const [product, setProd] = useState(null);
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + `/api/products/${id}`;
    const [cookies, setCookie] = useCookies(['cartItems']);

    function addProduct(product_id) {
        try{
            const cart = JSON.stringify(cookies.cartItems) ? JSON.parse(cookies.cartItems) : [];
            cart.push(product_id);
            setCookie('cartItems', JSON.stringify(cart), { maxAge: 7200 }); //  Cookie for cart will last 2 hours
        } catch(err) {
            console.error("Error adding product to cart: ", err);
        }
    }

    useEffect(() => {

        let mounted = true;

        async function fetchData() {
            try{
                const response = await fetch(apiUrl);
                if(response.ok){
                    const data = await response.json();
                    if(mounted){
                        setProd(data);
                        setError(null);
                    }
                } else {
                    if(mounted){
                        setError("Error fetching product details.");
                        setProd(null);
                    }
                }
            } catch(err) {
                if(mounted) {
                    setError("An error occured while fetching product details.");
                }
            }
        }
        fetchData();

        return () => {
            mounted = false;
        };

    }, [apiUrl]);

    return(
        <>
            <h1>Details Page</h1>
            { error ? (
                <p>{error}</p>
            ) : product ? (
                <div>
                    <h2>{product.name}</h2>
                    <p>Description: {product.description}</p>
                    <p>Cost: {product.cost}</p>
                    <div>                        
                        <Link to="/cart" onClick={() => addProduct(product_id)}>Add to Cart</Link>
                        <br/>
                        <Link to="/" className="btn btn-primary">Go Back</Link>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
