import React from 'react';

import Product from './Product';

import * as products from '../utils/products.json';

const MarketPlace = () => {
    console.log(products);
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <h1>Marketplace</h1>
                <p>Check out the offerings below and make a purchase!</p>
            </div>
            <section
                style={{
                    marginTop: '20px',
                    paddingTop: '50px',
                    width: '90vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    borderTop: '2px blue solid',
                }}
            >
                {products.length > 0 &&
                    products.map((product, index) => {
                        return <Product key={index} product={product} />;
                    })}
            </section>
        </div>
    );
};

export default MarketPlace;
