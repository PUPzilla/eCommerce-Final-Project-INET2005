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
            <div className="home-products">
            {
                products.length > 0 ?
                products.map((product) => (
                    <Card key={product.product_id} product={product} apiHost={apiHost} showLinks={true}/>
                )) :
                <p>No products available.</p>
            }
            </div>
        </>
    );
};
