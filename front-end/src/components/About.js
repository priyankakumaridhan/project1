import React from 'react';

const About = () => {
    return (
        <div className="page about">
            <h1>About This Project</h1>

            <p>
                E-Dashboard is a MERN-stack admin dashboard for managing an e-commerce
                product catalogue. After signing up or logging in, a user can add products,
                browse the full catalogue, search it as they type, edit any entry, and
                delete what they no longer need.
            </p>

            <h2>Features</h2>
            <ul>
                <li>User registration and login</li>
                <li>JWT-protected routes — every product action requires a valid token</li>
                <li>Full product CRUD: create, list, update, delete</li>
                <li>Live search that queries the API on each keystroke</li>
            </ul>

            <h2>Frontend</h2>
            <ul>
                <li>React 19 with react-router-dom v7</li>
                <li>
                    Route protection via a <code>PrivateComponent</code> wrapper that
                    redirects unauthenticated visitors to the signup page
                </li>
                <li>Session state (user and token) held in <code>localStorage</code></li>
            </ul>

            <h2>Backend</h2>
            <ul>
                <li>Express 5 REST API served on port 5000</li>
                <li>Mongoose over MongoDB at <code>mongodb://localhost:27017/e-commerce</code></li>
                <li>
                    JSON Web Tokens verified by middleware reading the{' '}
                    <code>authorization</code> header on every product route
                </li>
            </ul>

            <h2>Data Model</h2>
            <ul>
                <li><code>Product</code> — name, price, category, company, userId</li>
                <li><code>User</code> — name, email, password</li>
            </ul>

            <h2>API Endpoints</h2>
            <ul>
                <li><code>POST /register</code> — create an account</li>
                <li><code>POST /login</code> — authenticate and receive a token</li>
                <li><code>POST /add-product</code> — create a product</li>
                <li><code>GET /products</code> — list all products</li>
                <li><code>GET /product/:id</code> — fetch a single product</li>
                <li><code>PUT /product/:id</code> — update a product</li>
                <li><code>DELETE /product/:id</code> — remove a product</li>
                <li><code>GET /search/:key</code> — search across name, price, category and company</li>
            </ul>
        </div>
    )
}

export default About;
