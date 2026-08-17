import React, { useEffect, useState } from 'react'

const Products=()=>{
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        getProducts();
    })
    const getProducts = async ()=>{
        let result = await fetch('http://localhost:5000/products');
        result= await result.json();
        setProducts(result);
        console.warn('PRODUCTs',products );
    }
    const deleteProduct=(id)=>{
         console.warn(id);
    }

    return(
        <div className="product-list">
            <h1>Produts list</h1>
            <ul>
                <li>S No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index)=>
            <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>$ {item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
            </ul>
  )
            }
        </div>
    )
}
export default Products;