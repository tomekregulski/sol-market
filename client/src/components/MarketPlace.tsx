import React, { useEffect, useContext, useState } from 'react';

import useTokens from '../context/tokens/token.actions';
import { TokenContext } from '../context/tokens/token.context';

import Product from './Product';
import ProductInput from './ProductInput';

import axios from 'axios';

// @ts-ignore
const MarketPlace = ({ program, provider, balance }) => {
    const [displayForm, setDisplayForm] = useState({ type: '', productInfo: {} });

    const {
        state: { purchases, products, tokenAmount, staked, loading },
    } = useContext(TokenContext);

    // @ts-ignore
    const { checkUserMagaiBalance, fetchProducts, sendPayment, updateProductInventory, fetchUserTx } = useTokens();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products]);

    useEffect(() => {
        if (Object.keys(purchases).length === 0 && provider.wallet) {
            fetchUserTx(provider.wallet.publicKey.toString());
        }
    }, [provider.wallet, purchases.length]);

    const form = (displayType: string, id = '') => {
        console.log(displayType);
        console.log(id);
        // @ts-ignore
        const productInfo = products.filter((product) => product._id === id);
        console.log(productInfo);
        setDisplayForm({ type: displayType, productInfo: productInfo[0] });
    };

    // @ts-ignore
    const purchase = async (id, price, quantity, remaining_stock) => {
        console.log(id, price, quantity);
        // @ts-ignore
        const product = products.filter((item) => item._id === id)[0];
        // @ts-ignore
        const totalAmount = product.price * quantity;
        console.log(totalAmount);
        // @ts-ignore
        if (product.price !== price) {
            alert('The price is not correct');
        }

        if (totalAmount > balance) {
            alert('You do not have enough MAGAI to make this purchase');
        } else {
            console.log('awesome, you can make the purchase');
        }

        const tx = await sendPayment(program, totalAmount);
        if (tx.message === 'success') {
            // TODO: POST record of successful purchase
            const record = {
                user_id: 1,
                wallet: provider.wallet.publicKey.toString(),
                product_id: id,
                quantity,
                totalSpent: totalAmount,
                txHash: tx.payload,
            };

            await axios.post(`http://localhost:5678/v1/tx`, record).then((res) => console.log(res.data));
            updateProductInventory(remaining_stock, quantity, id);
            fetchUserTx(provider.wallet.publicKey.toString());

            try {
                await checkUserMagaiBalance(provider);
                await fetchProducts();
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('transaction failed to send');
        }
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
                        return <Product key={index} product={product} callback={purchase} edit={form} />;
                    })}
            </section>
            <section>
                <button onClick={() => form('add')}>Admin: Add a Product:</button>
            </section>
            <section>
                {displayForm.type !== '' && (
                    //@ts-ignore
                    <ProductInput type={displayForm.type} productInfo={displayForm.productInfo} />
                )}
            </section>
        </div>
    );
};

export default MarketPlace;
