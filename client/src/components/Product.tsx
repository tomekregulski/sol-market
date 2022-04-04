import React, { useState, useEffect, useContext } from 'react';

import useTokens from '../context/tokens/token.actions';
import { TokenContext } from '../context/tokens/token.context';

import axios from 'axios';

import * as styles from '../styles/index';

// @ts-ignore
const Product = (props): FC => {
    const { _id, name, price, description, deadline, image, remaining_stock, per_person } = props.product;

    const {
        state: { purchases, products, tokenAmount, staked, loading },
    } = useContext(TokenContext);

    // @ts-ignore
    // const { checkUserMagaiBalance, fetchProducts, sendPayment, updateProductInventory, fetchUserTx } = useTokens();

    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [purchased, setPurchased] = useState(0);

    useEffect(() => {
        // move to actions
        for (const purchase in purchases) {
            if (purchase === _id) {
                //@ts-ignore
                console.log('purchased: ', purchases[purchase]);
                //@ts-ignore
                setPurchased(purchases[purchase]);
            }
        }
        // const queryTx = async () => {
        //     const data = await axios.get('http://localhost:5678/v1/tx');
        //     let alreadyPurchased = 0;
        //     // @ts-ignore
        //     data.data.forEach((tx) => {
        //         if (tx.product_id._id === _id) {
        //             alreadyPurchased = alreadyPurchased + tx.quantity;
        //         }
        //         setPurchased(alreadyPurchased);
        //     });
        // };
        // queryTx();
    }, [purchases]);

    const purchaseHandler = () => {
        if (selectedQuantity === 0) {
            alert('You must select a quantity higher than 0');
            return;
        }
        if (purchased === per_person) {
            alert('You have already purchased the maximum amount');
            return;
        }
        props.callback(_id, price, selectedQuantity, remaining_stock);
    };

    // @ts-ignore
    const handleSelect = (e) => {
        setSelectedQuantity(parseInt(e.target.value));
    };

    // @ts-ignore
    const handleEdit = (e) => {
        props.edit('edit', _id);
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
                <span>Remaining Inventory: {remaining_stock}</span>
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
                <button onClick={(e) => handleEdit(e)}>Admin: Edit</button>
            </div>
        </>
    );
};

export default Product;
