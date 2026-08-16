import React, {useState} from 'react';

const AddProduct=()=>{
    const [name, setName]=useState('');
    const [price, setPrice]=useState('');
    const [category, setCategory]=useState('');
    const [company, setCompany]=useState('');
    
    const addProduct= async ()=>{
        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'));
        console.warn(userId._id);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body:  JSON.stringify({name, price, category, company, userId}),
            headers: {
                        'content-type': 'application/json'
            }
        })
         result= await result.json();
        console.warn(result);

    }
return(
    <div className="product">
        <h1> 
            Add Product
        </h1>
        <input type="text" placeholder='Enter product name' className="inputBox"
        onChange={(e)=>{setName(e.target.value)}} value={name}
        />
        <input type="text" placeholder='Enter product price' className="inputBox"
        onChange={(e)=>{setPrice(e.target.value)}} value={price}
        />
        <input type="text" placeholder='Enter product category' className="inputBox"
        onChange={(e)=>{setCategory(e.target.value)}} value={category}
        />
        <input type="text" placeholder='Enter product company' className="inputBox"
        onChange={(e)=>{setCompany(e.target.value)}} value={company}
        />
        <button onClick={addProduct} className="appButton">Add Product</button>
    </div>
)
};
export default AddProduct;