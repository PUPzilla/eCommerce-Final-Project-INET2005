import React from "react";
import { useState, useEffect } from 'react';

export default function Home() {
    //  Display all products

    const [products, setProd] = useState([]);
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + "/all";

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
            <h1>Home Page</h1>
            <h2>Products</h2>
            {
                products.length > 0 ?
                products.map((prod) => (
                    <Card key={prod.id} prod={prod} apiHost={apiHost} showLinks={true}/>
                )) :
                <p>No products available.</p>
            }
        </>
    );
};
