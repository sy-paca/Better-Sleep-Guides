// Product Ranking Block Component
// Creates a full product ranking card for review/advertorial articles
// Usage: createProductRankingBlock({ rankBadgeClass, rankLabel, imageSrc, imageAlt, imageContain, name, nameSuffix, subtitle, gradeClass, grade, score, body, ratings, pros, cons, experience, callout, ctaPrimaryText, ctaPrimaryUrl, ctaPrimaryExternal, ctaSecondaryText, ctaSecondaryUrl })
// All fields optional except name, rankLabel, rankBadgeClass

(function () {
    'use strict';

    function createProductRankingBlock(config) {
        const {
            rankBadgeClass,
            rankLabel,
            imageSrc = '',
            imageAlt = '',
            name,
            nameSuffix = '',
            subtitle = '',
            gradeClass = '',
            grade = '',
            score = '',
            body = '',
            ratings = [],
            pros = [],
            cons = [],
            experience = '',
            callout = '',
            ctaPrimaryText = '',
            ctaPrimaryUrl = '#',
            ctaPrimaryExternal = false,
            ctaSecondaryText = '',
            ctaSecondaryUrl = '#'
        } = config;

        if (!name || !rankLabel || !rankBadgeClass) {
            console.error('createProductRankingBlock requires name, rankLabel, and rankBadgeClass');
            return '';
        }

        // Image
        const imageHTML = `<img src="${imageSrc}" alt="${imageAlt}" class="product-ranking-image" onerror="this.style.display='none'">`;

        // Name + optional suffix
        const nameSuffixHTML = nameSuffix
            ? ` <span style="font-size:0.85rem;color:#8B8B8B;font-family:'Inter',sans-serif;">${nameSuffix}</span>`
            : '';

        // Grade + score badges
        const badgesHTML = (grade || score)
            ? `<div class="product-ranking-badges">
                    ${grade ? `<div class="grade-badge ${gradeClass}">${grade}</div>` : ''}
                    ${score ? `<div class="score-display">${score}<span>/10</span></div>` : ''}
                </div>`
            : '';

        // Rating bars
        const ratingBarsHTML = ratings.length
            ? `<div class="rating-bars">
                    ${ratings.map(r => `
                    <div class="rating-bar-row">
                        <span class="rating-bar-label">${r.label}</span>
                        <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${Math.round(r.value * 10)}%"></div></div>
                        <span class="rating-bar-value">${r.value}</span>
                    </div>`).join('')}
                </div>`
            : '';

        // Pros / cons
        const prosConsHTML = (pros.length || cons.length)
            ? `<div class="pros-cons-grid">
                    ${pros.length ? `<div class="pros-list"><strong>Pros</strong><ul>${pros.map(p => `<li>${p}</li>`).join('')}</ul></div>` : ''}
                    ${cons.length ? `<div class="cons-list"><strong>Cons</strong><ul>${cons.map(c => `<li>${c}</li>`).join('')}</ul></div>` : ''}
                </div>`
            : '';

        // Experience quote
        const experienceHTML = experience
            ? `<div class="our-experience"><strong>Our experience:</strong> ${experience}</div>`
            : '';

        // Offer callout
        const calloutHTML = callout
            ? `<div class="offer-callout">${callout}</div>`
            : '';

        // CTAs
        const externalAttrs = ctaPrimaryExternal ? ' target="_blank" rel="noopener"' : '';
        const ctaHTML = (ctaPrimaryText || ctaSecondaryText)
            ? `<div class="ranking-cta-group">
                    ${ctaPrimaryText ? `<a href="${ctaPrimaryUrl}" class="cta-primary"${externalAttrs}>${ctaPrimaryText}</a>` : ''}
                    ${ctaSecondaryText ? `<a href="${ctaSecondaryUrl}" class="cta-secondary">${ctaSecondaryText}</a>` : ''}
                </div>`
            : '';

        return `
            <div class="product-ranking-block">
                <span class="rank-badge ${rankBadgeClass}">${rankLabel}</span>
                <div class="product-ranking-header">
                    ${imageHTML}
                    <div class="product-ranking-meta">
                        <h2>${name}${nameSuffixHTML}</h2>
                        ${subtitle ? `<p class="small-text" style="color:#8B8B8B;margin-bottom:0.5rem;">${subtitle}</p>` : ''}
                        ${badgesHTML}
                    </div>
                </div>
                ${body}
                ${ratingBarsHTML}
                ${prosConsHTML}
                ${experienceHTML}
                ${calloutHTML}
                ${ctaHTML}
            </div>
        `;
    }

    window.createProductRankingBlock = createProductRankingBlock;
})();
