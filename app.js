// app.js
document.addEventListener('DOMContentLoaded', () => {
    const services = [
        {
            title: "Web Development",
            languages: ["HTML/CSS", "JavaScript", "PHP", "Python"],
            price: "Starting at $50"
        },
        {
            title: "Mobile App Development",
            languages: ["React Native", "Flutter", "Swift", "Kotlin"],
            price: "Starting at $100"
        }
    ];

    const container = document.querySelector('.products-container');
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h2>${service.title}</h2>
            <div class="price">${service.price}</div>
            <div class="languages">${service.languages.join(', ')}</div>
            <button class="avail-button">Avail Now</button>
            <form class="transaction-form" style="display: none;">
                <input type="text" name="contact" class="form-input" placeholder="Enter your email, Discord, or preferred contact platform" required>
                <button type="submit" class="submit-button">Submit</button>
            </form>
        `;
        container.appendChild(card);
    });

    // Toggle the transaction form on button click
    document.querySelectorAll('.avail-button').forEach(button => {
        button.addEventListener('click', () => {
            const form = button.nextElementSibling;
            button.style.display = 'none';
            form.style.display = 'block';
        });
    });

    // Handle form submission and send the data to Discord
    document.querySelectorAll('.transaction-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const contactInfo = formData.get('contact');
            const serviceCard = form.closest('.product-card');
            const serviceTitle = serviceCard.querySelector('h2').textContent;
            const servicePrice = serviceCard.querySelector('.price').textContent;
            const serviceLanguages = serviceCard.querySelector('.languages').textContent;

            // Create the payload for Discord
            const discordPayload = {
                content: `New Transaction Request for ${serviceTitle}`,
                embeds: [{
                    fields: [
                        { name: "Service", value: serviceTitle },
                        { name: "Price", value: servicePrice },
                        { name: "Languages", value: serviceLanguages },
                        { name: "Contact Information", value: contactInfo }
                    ],
                    color: 0x3498db
                }]
            };

            try {
                const response = await fetch('https://discord.com/api/webhooks/1338643150079791154/1LF0zuXnI9nlN6sgzz2uv5OdylFkRQBOni0FjJh_hDwecFyBFqooJxz_wwx03eZN5jy5', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discordPayload)
                });
                
                if (response.ok) {
                    alert('Transaction info submitted! We will contact you soon.');
                    form.reset();
                    form.style.display = 'none';
                    serviceCard.querySelector('.avail-button').style.display = 'block';
                } else {
                    alert('Error submitting transaction info. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting transaction info. Please try again.');
            }
        });
    });
});
