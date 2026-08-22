import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FIELDS = [
    { id: 'name', label: 'Product name', error: 'Enter a product name' },
    { id: 'price', label: 'Price', error: 'Enter a price' },
    { id: 'category', label: 'Category', error: 'Enter a category' },
    { id: 'company', label: 'Company', error: 'Enter a company' },
];

const AddProduct = () => {
    const [values, setValues] = useState({ name: '', price: '', category: '', company: '' });
    const [error, setError] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const setField = (id) => (event) =>
        setValues((current) => ({ ...current, [id]: event.target.value }));

    const addProduct = async () => {
        if (!values.name || !values.price || !values.category || !values.company) {
            setError(true);
            return;
        }

        setSaving(true);
        const userId = JSON.parse(localStorage.getItem('user'));
        const response = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ ...values, userId }),
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        await response.json();
        setSaving(false);
        navigate('/product');
    };

    return (
        <div className="page auth">
            <h1 className="page-title">Add product</h1>
            <p className="page-subtitle">Add a new item to your catalogue.</p>

            <div className="card card__pad" style={{ marginTop: 'var(--sp-4)' }}>
                {FIELDS.map((field) => {
                    const invalid = error && !values[field.id];
                    return (
                        <div className="field" key={field.id}>
                            <label className="field__label" htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <input
                                id={`field-${field.id}`}
                                type="text"
                                className="input"
                                value={values[field.id]}
                                onChange={setField(field.id)}
                                aria-invalid={invalid ? 'true' : undefined}
                                aria-describedby={invalid ? `error-${field.id}` : undefined}
                            />
                            {invalid && (
                                <span className="field__error" id={`error-${field.id}`}>
                                    {field.error}
                                </span>
                            )}
                        </div>
                    );
                })}

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn--primary"
                        onClick={addProduct}
                        disabled={saving}
                    >
                        {saving ? 'Adding…' : 'Add product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
