import React from 'react';

import Product from './Product';

import axios from 'axios';

import * as products from '../utils/products.json';

import { initialize } from '../utils/transactions';

// @ts-ignore
const MarketPlace = ({ program, provider }) => {
    console.log(provider);
    console.log(program);
    // @ts-ignore
    const purchase = async (id, price) => {
        console.log(id, price);
        // TODO: validate that incoming price === product price on file
        // product = products.filter where product.id === id

        // TODO: validate that the user currently holds enough tokens to make the purchase

        // TODO: send transaction
        await initialize(provider, program);

        // TODO: POST record of successful purchase
        const formData = {
            wallet: 'fake',
            productId: '1',
            quantity: '1',
            totalPrice: '14',
        };

        const postData = await axios
            .post(`http://localhost:5678/v1/tx`, formData)
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
