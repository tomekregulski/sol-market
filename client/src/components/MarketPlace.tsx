import React, { useState, useEffect } from 'react';

import Product from './Product';

import axios from 'axios';

import { initialize } from '../utils/transactions';

const apiRootUrl = 'http://localhost:5678';

// @ts-ignore
const MarketPlace = ({ program, provider, balance }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${apiRootUrl}/v1/products`).then((res) => setProducts(res.data));
    }, []);

    // @ts-ignore
    const purchase = async (id, price, quantity = 1) => {
        console.log(id, price);
        // @ts-ignore
        const product = products.filter((item) => item._id === id)[0];
        // @ts-ignore
        if (product.price !== price) {
            alert('The price is not correct');
        }
        // @ts-ignore
        if (product.price * quantity > balance) {
            alert('You do not have enough MAGAI to make this purchase');
        } else {
            console.log('awesome, you can make the purchase');
        }
        // TODO: send transaction
        const tx = await initialize(provider, program);

        // TODO: POST record of successful purchase
        const record = {
            user_id: 1,
            wallet: provider.wallet.publicKey.toString(),
            product_id: id,
            // @ts-ignore
            // product_name: product.name,
            quantity,
            // price,
            totalSpent: quantity * price,
            txHash: tx,
        };

        console.log(record);

        const postData = await axios
            .post(`http://localhost:5678/v1/tx`, record)
            .then((response) => console.log(response));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ width: '100vw', borderBottom: '2px blue solid', padding: '20px 0' }}>
                <h1>Marketplace</h1>
                <p>Check out the offerings below and make a purchase!</p>
            </div>
            <section
                style={{
                    marginTop: '20px',
                    padding: '50px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                }}
            >
                {products.length > 0 &&
                    products.map((product, index) => {
                        return <Product key={index} product={product} callback={purchase} />;
                    })}
            </section>
        </div>
    );
};

export default MarketPlace;
