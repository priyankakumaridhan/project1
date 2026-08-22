import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog.js';

const authHeaders = () => ({
    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
});

const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

const formatPrice = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? money.format(n) : `$ ${value}`;
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState(null);

    const getProducts = useCallback(async () => {
        setLoading(true);
        let result = await fetch('http://localhost:5000/products', {
            headers: authHeaders()
        });
        result = await result.json();
        setProducts(result);
        setLoading(false);
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const confirmDelete = async () => {
        const id = pendingDelete._id;
        setPendingDelete(null);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: authHeaders()
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        const key = event.target.value;
        if (!key) {
            getProducts();
            return;
        }
        setLoading(true);
        let result = await fetch(`http://localhost:5000/search/${key}`, {
            headers: authHeaders()
        });
        result = await result.json();
        if (result) {
            setProducts(result);
        }
        setLoading(false);
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Products</h1>
                    <p className="page-subtitle" aria-live="polite">
                        {loading
                            ? 'Loading…'
                            : `${products.length} ${products.length === 1 ? 'item' : 'items'} in your catalogue`}
                    </p>
                </div>
                <Link to="/add-product" className="btn btn--primary">+ Add product</Link>
            </div>

            <div className="card">
                <div className="toolbar">
                    <label className="visually-hidden" htmlFor="product-search">Search products</label>
                    <input
                        id="product-search"
                        type="search"
                        className="input search"
                        placeholder="Search products"
                        onChange={searchHandle}
                    />
                </div>

                {loading ? (
                    <div aria-busy="true">
                        <div className="skeleton-row" />
                        <div className="skeleton-row" />
                        <div className="skeleton-row" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state__title">No products yet</p>
                        <p>Nothing matches your search, or the catalogue is empty.</p>
                    </div>
                ) : (
                    <div className="table-wrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="cell-index">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Company</th>
                                    <th scope="col"><span className="visually-hidden">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={item._id}>
                                        <td className="cell-index">{index + 1}</td>
                                        <td className="cell-name" data-label="Name">{item.name}</td>
                                        <td className="cell-price" data-label="Price">{formatPrice(item.price)}</td>
                                        <td data-label="Category"><span className="badge">{item.category}</span></td>
                                        <td data-label="Company">{item.company}</td>
                                        <td className="cell-actions">
                                            <Link to={'/update/' + item._id} className="btn btn--ghost btn--sm">
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn--ghost btn--sm"
                                                onClick={() => setPendingDelete(item)}
                                                aria-label={`Delete ${item.name}`}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {pendingDelete && (
                <ConfirmDialog
                    title="Delete product?"
                    message={`"${pendingDelete.name}" will be permanently removed. This cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={confirmDelete}
                    onCancel={() => setPendingDelete(null)}
                />
            )}
        </div>
    )
}

export default Products;
