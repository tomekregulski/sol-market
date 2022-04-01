import React, { useState } from 'react';

import * as styles from '../styles/index';

// @ts-ignore
const Product = (props): FC => {
    const { _id, name, price, description, deadline, image, total_stock, per_person } = props.product;

    const [quantity, setQuantity] = useState(0);

    const purchaseHandler = () => {
        if (quantity === 0) {
            alert('You must select a quantity higher than 0');
        }
        props.callback(_id, price, quantity);
    };

    // @ts-ignore
    const handleSelect = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    return (
        <>
            <div
                style={{
                    border: '2px blue solid',
                    height: '500px',
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 20px',
                }}
            >
                <img src={image} />
                <span>{name}</span>
                <span>Description:</span>
                <span>{description}</span>
                <span>Available Until: {deadline}</span>
                <span>Price: {price} $MAGAI</span>
                <div>
                    <span>Select Quantity: </span>
                    <select onChange={(e) => handleSelect(e)} style={{ padding: '2px 15px' }} name="quantity">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <button style={styles.btnStyle} onClick={purchaseHandler}>
                    Buy
                </button>
            </div>
        </>
    );
};

export default Product;
