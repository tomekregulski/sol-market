import React from 'react';

import Product from './Product';

import * as products from '../utils/products.json';

const MarketPlace = () => {
    // @ts-ignore
    const purchase = (id, price) => {
        console.log(id, price);
        // TODO: validate that incoming price === product price on file
        // product = products.filter where product.id === id

        // TODO: validate that the user currently holds enough tokens to make the purchase

        // TODO: send transaction

        // TODO: POST record of successful purchase
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
