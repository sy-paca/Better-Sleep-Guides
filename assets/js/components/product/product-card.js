// Product Card Component
// Creates the actual product card HTML
// Usage: createProductCard({ imagePath: 'assets/images/img.png', alt: 'Product', url: '...', description: '...', reviewText: '...' })
// Dependencies: product-reviews.js (optional, for review data)

(function() {
    'use strict';
    
    function createProductCard(config) {
        const {
            imagePath,
            alt,
            url,
            description,
            reviewText = '',
            clickable = true
        } = config;

        if (!imagePath || !alt) return '';

        if (clickable && url) {
            return `
                <div class="product-card-inline">
                    <div class="product-card-image">
                        <img src="${imagePath}" alt="${alt}">
                    </div>
                    <h3 class="product-card-title">${alt}</h3>
                    <div class="product-card-content">
                        ${reviewText ? `<p class="product-card-reviews">${reviewText}</p>` : ''}
                        ${description ? `<p class="product-card-description">${description}</p>` : ''}
                        <a href="${url}" class="product-card-btn" target="_blank" rel="noopener noreferrer">Shop Now</a>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="article-content-image d-flex">
                    <img src="${imagePath}" class="article-img" alt="${alt}">
                </div>
            `;
        }
    }
    
    window.createProductCard = createProductCard;
})();

