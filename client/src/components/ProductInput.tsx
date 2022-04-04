import axios from 'axios';
import React, { useState } from 'react';
import Input from './Input';

// @ts-ignore
const ProductInput = (props) => {
    const [form, setForm] = useState({});
    console.log(props.productInfo);

    // @ts-ignore
    const handleInput = (input) => {
        const name = input.name;
        let value = input.value;
        if (input.type === 'number') {
            value = parseInt(value);
        }
        if (input.type === 'boolean') {
            if (value === 'true') {
                value = true;
            }
            if (value === 'false') {
                value = false;
            }
        }
        setForm({ ...form, [name]: value });
    };

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        const payload = {
            // @ts-ignore
            name: form.product_name,
            // @ts-ignore
            logo: form.logo,
            // @ts-ignore
            image: form.image,
            // @ts-ignore
            description: form.description,
            // @ts-ignore
            price: form.price,
            // @ts-ignore
            remaining_stock: form.inventory,
            // @ts-ignore
            per_person: form.per_person,
            // @ts-ignore
            deadline: form.deadline,
            // @ts-ignore
            active: form.active,
        };
        console.log(payload);
        if (props.type === 'add') {
            axios.post('http://localhost:5678/v1/products', payload);
        }
        if (props.type === 'edit') {
            axios.put(`http://localhost:5678/v1/products/${props.productInfo._id}`, payload);
        }
    };

    return (
        <div>
            <h2>Create a New Product</h2>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '60px',
                }}
                onSubmit={(e) => handleSubmit(e)}
            >
                <Input
                    callback={handleInput}
                    title="Product Name"
                    name="product_name"
                    type="text"
                    value={props.productInfo.name ? props.productInfo.name : ''}
                />
                <Input
                    callback={handleInput}
                    title="Image Source"
                    name="image"
                    type="text"
                    value={props.productInfo.name ? props.productInfo.image : ''}
                />
                <Input
                    callback={handleInput}
                    title="Description"
                    name="description"
                    type="text"
                    value={props.productInfo.name ? props.productInfo.description : ''}
                />
                <Input
                    callback={handleInput}
                    title="Price"
                    name="price"
                    value={props.productInfo.name ? props.productInfo.price : ''}
                />
                <Input
                    callback={handleInput}
                    title="Starting Inventory"
                    name="inventory"
                    type="number"
                    value={props.productInfo.name ? props.productInfo.remaining_stock : ''}
                />
                <Input
                    callback={handleInput}
                    title="Max Amount Per Person"
                    name="per_person"
                    type="number"
                    value={props.productInfo.name ? props.productInfo.per_person : ''}
                />
                <Input
                    callback={handleInput}
                    title="Deadline"
                    name="deadline"
                    type="number"
                    value={props.productInfo.name ? props.productInfo.deadline : ''}
                />
                {props.type === 'edit' && (
                    <>
                        <label>Active Status</label>
                        <select
                            onChange={(e) => handleInput({ name: 'active', value: e.target.value, type: 'boolean' })}
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProductInput;
