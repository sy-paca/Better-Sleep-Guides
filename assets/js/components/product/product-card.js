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
            clickable = true,
            eyebrow = '',
            headline,
            ctaText = 'Learn more'
        } = config;

        if (!imagePath || !alt) return '';

        const displayHeadline = headline || alt;
        const eyebrowTrimmed =
            eyebrow == null ? '' : typeof eyebrow === 'string' ? eyebrow.trim() : String(eyebrow).trim();
        const eyebrowHtml = eyebrowTrimmed
            ? `<p class="product-card-eyebrow">${eyebrowTrimmed}</p>`
            : '';

        if (clickable && url) {
            return `
                <div class="product-card-inline">
                    <div class="product-card-inner">
                        <div class="product-card-media">
                            <div class="product-card-image">
                                <img src="${imagePath}" alt="${alt}">
                            </div>
                        </div>
                        <div class="product-card-copy">
                            ${eyebrowHtml}
                            <h3 class="product-card-title">${displayHeadline}</h3>
                            ${reviewText ? `<p class="product-card-reviews">${reviewText}</p>` : ''}
                            ${description ? `<p class="product-card-description">${description}</p>` : ''}
                            <a href="${url}" class="product-card-btn" target="_blank" rel="noopener noreferrer">${ctaText}</a>
                        </div>
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

