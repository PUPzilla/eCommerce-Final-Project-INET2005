import React from "react";
import { useState, useEffect } from 'react';
import Card from '../ui/card';

export default function Home() {
    
    //  Display all products

    const [products, setProd] = useState([]);
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + "/api/products/all";

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl);
            if(response.ok){
                const data = await response.json();
                if(!ignore){
                    setProd(data);
                }
            } else {
                setProd(null);
            }
        }
        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);

    return(
        <>
            <h1>Home</h1>
            <h2>All products</h2>
            {
                products.length > 0 ?
                products.map((product) => (
                    <div key={product.product_id}>
                        <Card key={product.product_id} product={product} apiHost={apiHost} showLinks={true}/>
                    </div>
                )) :
                <p>No products available.</p>
            }
        </>
    );
};
