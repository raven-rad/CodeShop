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
            <form class="request-form">
                <input type="email" class="form-input" placeholder="Your Email" required>
                <input type="text" class="form-input" placeholder="Project Name" required>
                <textarea class="form-input" placeholder="Project Description" rows="4" required></textarea>
                <select class="form-input" required>
                    <option value="">Select Language</option>
                    ${service.languages.map(lang => `<option>${lang}</option>`).join('')}
                </select>
                <button type="submit" class="submit-button">Send Request</button>
            </form>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.avail-button').forEach(button => {
        button.addEventListener('click', () => {
            const form = button.nextElementSibling;
            button.style.display = 'none';
            form.classList.add('visible');
        });
    });

    document.querySelectorAll('.request-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const serviceTitle = form.closest('.product-card').querySelector('h2').textContent;

            const discordPayload = {
                content: `New Code Request: ${serviceTitle}`,
                embeds: [{
                    fields: [
                        { name: "Email", value: formData.get('email') },
                        { name: "Project Name", value: formData.get('project-name') },
                        { name: "Description", value: formData.get('project-description') },
                        { name: "Language", value: formData.get('language') }
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
                    alert('Request submitted! We\'ll contact you within 24 hours.');
                    form.reset();
                    form.classList.remove('visible');
                    form.previousElementSibling.style.display = 'block';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting request. Please try again.');
            }
        });
    });
});
