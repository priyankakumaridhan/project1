import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FIELDS = [
    { id: 'name', label: 'Product name' },
    { id: 'price', label: 'Price' },
    { id: 'category', label: 'Category' },
    { id: 'company', label: 'Company' },
];

const authHeaders = () => ({
    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
});

const UpdateProduct = () => {
    const [values, setValues] = useState({ name: '', price: '', category: '', company: '' });
    const [saving, setSaving] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = useCallback(async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: authHeaders()
        });
        result = await result.json();
        setValues({
            name: result.name || '',
            price: result.price || '',
            category: result.category || '',
            company: result.company || ''
        });
    }, [params.id]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    const setField = (id) => (event) =>
        setValues((current) => ({ ...current, [id]: event.target.value }));

    const updateProduct = async () => {
        setSaving(true);
        await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify(values),
            headers: {
                'content-type': 'application/json',
                ...authHeaders()
            }
        });
        setSaving(false);
        navigate('/product');
    };

    return (
        <div className="page auth">
            <h1 className="page-title">Update product</h1>
            <p className="page-subtitle">Edit this item and save your changes.</p>

            <div className="card card__pad" style={{ marginTop: 'var(--sp-4)' }}>
                {FIELDS.map((field) => (
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
                        />
                    </div>
                ))}

                <div className="form-actions">
                    <button type="button" className="btn btn--primary" onClick={updateProduct} disabled={saving}>
                        {saving ? 'Saving…' : 'Save changes'}
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => navigate('/product')}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
