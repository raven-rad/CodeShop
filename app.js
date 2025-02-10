document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            title: "Responsive Navigation",
            code: `<nav class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
    </ul>
</nav>`,
            price: 9.99,
            id: "price_1PMykZDwN3d2D0T2h6t4X6Kk"
        },
        {
            title: "Login Form",
            code: `<form class="login-form">
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Password">
    <button type="submit">Login</button>
</form>`,
            price: 7.99,
            id: "price_1PMykZDwN3d2D0T2h6t4X6Kl"
        }
    ];

    const container = document.querySelector('.products-container');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h2>${product.title}</h2>
            <div class="code-preview">${product.code}</div>
            <div class="price">$${product.price}</div>
            <button class="buy-button" data-price-id="${product.id}">Purchase</button>
        `;
        container.appendChild(card);
    });

    // Stripe integration
    const stripe = Stripe('pk_test_51PMykZDwN3d2D0T2Jt4X6Kk'); // Replace with your key
    
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', async () => {
            const priceId = button.dataset.priceId;
            try {
                const response = await fetch('http://localhost:3000/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ priceId }),
                });
                const session = await response.json();
                await stripe.redirectToCheckout({ sessionId: session.id });
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
