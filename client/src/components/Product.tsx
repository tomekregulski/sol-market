import React from 'react';

// @ts-ignore
const Product = (props): FC => {
    const { id, name, price, description, deadline, image, total_stock, per_person } = props.product;

    const purchaseHandler = () => {
        props.callback(id, price);
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
                    <span>Quantity: </span>
                    <select style={{ marginRight: '30px', padding: '2px 15px' }} name="quantity">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <button style={{ marginLeft: '30px' }} onClick={purchaseHandler}>
                        Buy
                    </button>
                </div>
            </div>
        </>
    );
};

export default Product;
