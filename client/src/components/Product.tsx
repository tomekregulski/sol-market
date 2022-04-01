import React, { useState, useEffect } from 'react';

import axios from 'axios';

import * as styles from '../styles/index';

// @ts-ignore
const Product = (props): FC => {
    const { _id, name, price, description, deadline, image, total_stock, per_person } = props.product;

    const [quantity, setQuantity] = useState(0);
    const [purchased, setPurchased] = useState(0);

    useEffect(() => {
        // move to actions
        const queryTx = async () => {
            const data = await axios.get('http://localhost:5678/v1/tx');
            let alreadyPurchased = 0;
            // @ts-ignore
            data.data.forEach((tx) => {
                if (tx.product_id._id === _id) {
                    console.log(tx.quantity);
                    console.log(typeof tx.quantity);
                    alreadyPurchased = alreadyPurchased + tx.quantity;
                    console.log(alreadyPurchased);
                }
                console.log(alreadyPurchased);
                setPurchased(alreadyPurchased);
            });
        };
        queryTx();
    }, [_id]);

    const purchaseHandler = () => {
        if (quantity === 0) {
            alert('You must select a quantity higher than 0');
            return;
        }
        if (purchased === per_person) {
            alert('You have already purchased the maximum amount');
            return;
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
                {purchased > 0 && <span>You already have: {purchased}</span>}
                <span>Maximum per wallet: {per_person}</span>
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
