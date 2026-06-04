// Ad Component
// createAd — rich unit with background image + copy (see createAd below)
// createVerticalDisplayAd — tall display image only
// createArticleBannerAd — full-width image + eyebrow + overlay copy + CTA (sharp corners)
// createPacagenArticleBannerAd(pageType) — horizontal product-lineup unit (pacagen-products.jpg + pacagen-link)
// injectRandomArticleBanners(pageType) — inserts two banners at random positions between .article-section blocks
// injectArticleDesktopRailAd(pageType) — sticky desktop rail (Pacagen 50%, Summer Fridays / Blue Bottle 25% each; reveals at 50% read)
// Usage: createVerticalDisplayAd({ image: 'adv/aesop.png', alt: 'Aesop', ctaUrl: 'https://...', pageType: 'root' })
// injectArticleVerticalAds(pageType) — fills #article-vertical-ads with Pacagen + one third-party unit
// createPacagenVerticalAd(pageType) — standalone Pacagen vertical unit (sidebar / manual placement)

(function() {
    'use strict';

    const PACAGEN_VERTICAL_AD = {
        id: 'pacagen',
        image: 'adv/pacagen-cans-vertical.jpg',
        alt: 'Pacagen Cat Allergen Neutralizing Spray',
        kicker: 'Pacagen',
        headline: 'Cat Allergen Neutralizing Spray',
        deck: 'Science-backed relief for cat allergens in the air—so bedtime feels calmer.',
        ctaText: 'Shop now',
        ctaUrl: 'https://www.pacagen.com/products/cat-allergen-neutralizing-spray',
        hitAria: 'Shop Pacagen Cat Allergen Neutralizing Spray'
    };

    const PACAGEN_HORIZONTAL_AD = {
        id: 'pacagen',
        image: 'adv/pacagen-products.jpg',
        alt: 'Pacagen cat, dog, and dust allergen supplements and neutralizing sprays',
        kicker: 'Pacagen',
        headline: 'Fewer allergens in the air you breathe at night',
        deck: 'Science-backed sprays and supplements for cat, dog, and dust allergens—so bedtime feels calmer.',
        ctaText: 'Shop Pacagen',
        ctaUrl: 'https://www.pacagen.com/',
        hitAria: 'Shop Pacagen allergen solutions'
    };
    
    function resolveImagePath(image, pageType) {
        const assetPath = pageType === 'blog' ? '../assets' : 'assets';
        return image.startsWith('http') || image.startsWith('/')
            ? image
            : `${assetPath}/images/${image}`;
    }
    
    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /**
     * Full-width editorial banner: “Advertisement” eyebrow, image, left overlay (kicker, headline, CTA).
     */
    function createArticleBannerAd(config) {
        const {
            image,
            alt = 'Advertisement',
            kicker = '',
            headline,
            ctaText = '',
            ctaUrl = '#',
            pageType = 'root'
        } = config || {};

        if (!image || !headline) {
            console.warn('createArticleBannerAd: image and headline are required');
            return '';
        }

        const imgPath = resolveImagePath(image, pageType);
        const clickable = Boolean(ctaUrl && ctaUrl !== '#');
        const kickerHTML = kicker
            ? `<p class="article-banner-ad-kicker">${escapeHtml(kicker)}</p>`
            : '';

        let ctaHTML = '';
        if (ctaText) {
            if (clickable) {
                ctaHTML = `<a class="article-banner-ad-cta" href="${escapeAttr(ctaUrl)}" target="_blank" rel="sponsored noopener noreferrer">${escapeHtml(ctaText)}</a>`;
            } else {
                ctaHTML = `<span class="article-banner-ad-cta article-banner-ad-cta--static">${escapeHtml(ctaText)}</span>`;
            }
        }

        return `
            <aside class="article-banner-ad" data-ad="banner" role="complementary" aria-label="Advertisement">
              <p class="article-banner-ad-eyebrow">Advertisement</p>
              <div class="article-banner-ad-shell">
                <img class="article-banner-ad-image" src="${imgPath}" alt="${escapeAttr(alt)}" loading="lazy" width="1200" height="514">
                <div class="article-banner-ad-overlay">
                  ${kickerHTML}
                  <h3 class="article-banner-ad-headline">${escapeHtml(headline)}</h3>
                  ${ctaHTML}
                </div>
              </div>
            </aside>
        `.trim();
    }

    /**
     * Full-width horizontal Pacagen banner (product lineup). Whole unit is pacagen-link tracked.
     */
    function createPacagenArticleBannerAd(pageType) {
        const pt = pageType === 'blog' ? 'blog' : 'root';
        const v = PACAGEN_HORIZONTAL_AD;
        const imgPath = resolveImagePath(v.image, pt);

        return `
            <aside class="article-banner-ad article-banner-ad--pacagen" data-ad="pacagen-banner" role="complementary" aria-label="Advertisement">
              <p class="article-banner-ad-eyebrow">Advertisement</p>
              <a class="article-banner-ad-hit pacagen-link" href="${escapeAttr(v.ctaUrl)}" aria-label="${escapeAttr(v.hitAria)}">
                <div class="article-banner-ad-shell article-banner-ad-shell--pacagen">
                  <img class="article-banner-ad-image" src="${imgPath}" alt="${escapeAttr(v.alt)}" loading="lazy" width="1200" height="400">
                  <div class="article-banner-ad-overlay article-banner-ad-overlay--pacagen">
                    <h3 class="article-banner-ad-headline">${escapeHtml(v.headline)}</h3>
                    <p class="article-banner-ad-deck">${escapeHtml(v.deck)}</p>
                    <span class="article-banner-ad-cta article-banner-ad-cta--pacagen">${escapeHtml(v.ctaText)}</span>
                  </div>
                </div>
              </a>
            </aside>
        `.trim();
    }

    function renderArticleBannerFromConfig(config) {
        if (config && config.id === 'pacagen') {
            return createPacagenArticleBannerAd(config.pageType);
        }
        return createArticleBannerAd(config);
    }

    function shuffleInPlace(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
        return arr;
    }

    function pickTwoDistinctSectionIndices(n) {
        if (n < 2) {
            return [0, 0];
        }
        let a = Math.floor(Math.random() * n);
        let b = Math.floor(Math.random() * n);
        let guard = 0;
        while (b === a && guard++ < 40) {
            b = Math.floor(Math.random() * n);
        }
        if (b === a) {
            b = (a + 1) % n;
        }
        return a > b ? [a, b] : [b, a];
    }

    function defaultArticleBannerConfigs(pageType) {
        const pt = pageType === 'blog' ? 'blog' : 'root';
        return [
            { id: 'pacagen', pageType: pt },
            {
                image: 'adv/aesop.png',
                alt: 'Aesop',
                kicker: 'Aesop',
                headline: 'Botanical actives and tactile formulas—quiet luxury for the last hour before bed.',
                ctaText: 'Discover Aesop',
                ctaUrl: '#',
                pageType: pt
            },
            {
                image: 'adv/rhode.png',
                alt: 'Rhode',
                kicker: 'Rhode',
                headline: 'Barrier-friendly staples and that glazed-skin finish—an edited shelf, fewer steps.',
                ctaText: 'Explore Rhode',
                ctaUrl: '#',
                pageType: pt
            }
        ];
    }

    function injectRandomArticleBanners(pageType) {
        const container =
            document.querySelector('article.content .article-content') ||
            document.querySelector('.article-content.content-large') ||
            document.querySelector('article .article-content') ||
            document.querySelector('.article-content');
        if (!container) {
            return;
        }

        const sections = Array.prototype.slice.call(
            container.querySelectorAll(':scope > .article-section')
        );
        const configs = shuffleInPlace(defaultArticleBannerConfigs(pageType));
        const htmlA = renderArticleBannerFromConfig(configs[0]);
        const htmlB = renderArticleBannerFromConfig(configs[1]);

        if (sections.length === 0) {
            container.insertAdjacentHTML('beforeend', htmlA);
            container.insertAdjacentHTML('beforeend', htmlB);
            return;
        }

        if (sections.length === 1) {
            const s = sections[0];
            s.insertAdjacentHTML('afterend', htmlA);
            const first = s.nextElementSibling;
            if (first) {
                first.insertAdjacentHTML('afterend', htmlB);
            } else {
                s.insertAdjacentHTML('afterend', htmlB);
            }
            return;
        }

        const [hi, lo] = pickTwoDistinctSectionIndices(sections.length);
        sections[hi].insertAdjacentHTML('afterend', htmlA);
        sections[lo].insertAdjacentHTML('afterend', htmlB);
    }

    /**
     * Desktop rail: Pacagen (50%) or one of two third-party verticals (25% each).
     * Pacagen uses overlay copy + pacagen-link tracking; others are image + ghost CTA.
     */
    function pickDesktopRailVariant() {
        const roll = Math.random();
        if (roll < 0.5) {
            return Object.assign({}, PACAGEN_VERTICAL_AD);
        }
        if (roll < 0.75) {
            return {
                id: 'summer-fridays',
                image: 'adv/summer-fridays.png',
                alt: 'Summer Fridays Jet Lag Eye Patches',
                hitAria: 'Shop Summer Fridays',
                ctaUrl: '#'
            };
        }
        return {
            id: 'blue-bottle',
            image: 'adv/blue-bottle.png',
            alt: 'Blue Bottle Coffee',
            hitAria: 'Shop Blue Bottle',
            ctaUrl: '#'
        };
    }

    function buildThirdPartyRailMedia(v, imgPath) {
        return `
              <div class="article-desktop-rail-ad-media">
                <img class="article-desktop-rail-ad-img" src="${imgPath}" alt="${escapeAttr(v.alt)}" loading="lazy" width="320" height="560">
                <span class="article-desktop-rail-ad-cta">Shop now</span>
              </div>
        `.trim();
    }

    function buildPacagenRailMedia(v, imgPath) {
        return `
              <div class="article-desktop-rail-ad-media article-desktop-rail-ad-media--pacagen">
                <img class="article-desktop-rail-ad-img" src="${imgPath}" alt="${escapeAttr(v.alt)}" loading="lazy" width="320" height="560">
                <div class="article-desktop-rail-ad-copy">
                  <p class="article-desktop-rail-ad-kicker">${escapeHtml(v.kicker)}</p>
                  <h3 class="article-desktop-rail-ad-headline">${escapeHtml(v.headline)}</h3>
                  <p class="article-desktop-rail-ad-deck">${escapeHtml(v.deck)}</p>
                  <span class="article-desktop-rail-ad-cta article-desktop-rail-ad-cta--pacagen">${escapeHtml(v.ctaText)}</span>
                </div>
              </div>
        `.trim();
    }

    function buildArticleDesktopRailMarkup(pageType) {
        const v = pickDesktopRailVariant();
        const pt = pageType === 'blog' ? 'blog' : 'root';
        const imgPath = resolveImagePath(v.image, pt);
        const isPacagen = v.id === 'pacagen';
        const ctaUrl = v.ctaUrl || '#';
        const clickable = Boolean(ctaUrl && ctaUrl !== '#');
        const media = isPacagen
            ? buildPacagenRailMedia(v, imgPath)
            : buildThirdPartyRailMedia(v, imgPath);

        let hitOpen;
        if (!clickable) {
            hitOpen = '<div class="article-desktop-rail-ad-hit">';
        } else if (isPacagen) {
            hitOpen = `<a class="article-desktop-rail-ad-hit pacagen-link" href="${escapeAttr(ctaUrl)}" aria-label="${escapeAttr(v.hitAria)}">`;
        } else {
            hitOpen = `<a class="article-desktop-rail-ad-hit" href="${escapeAttr(ctaUrl)}" target="_blank" rel="sponsored noopener noreferrer" aria-label="${escapeAttr(v.hitAria)}">`;
        }
        const hitClose = clickable ? '</a>' : '</div>';
        const asideClass = isPacagen
            ? 'article-desktop-rail-ad article-desktop-rail-ad--pacagen'
            : 'article-desktop-rail-ad';

        return `
            <aside id="article-desktop-rail-ad" class="${asideClass}" data-ad="rail" data-rail-creative="${escapeAttr(v.id)}" role="complementary" aria-label="Advertisement" aria-hidden="true">
              <p class="article-desktop-rail-ad-eyebrow">Advertisement</p>
              ${hitOpen}
                ${media}
              ${hitClose}
            </aside>
        `.trim();
    }

    /**
     * Same reading % as the header bar (main.js): scrollY / (scrollHeight - clientHeight).
     * Short / non-scrollable pages: treat as 100% so the rail is not hidden forever.
     */
    function getReadingProgressPercent() {
        const docEl = document.documentElement;
        const scrollable = docEl.scrollHeight - docEl.clientHeight;
        if (scrollable <= 0) {
            return 100;
        }
        return Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
    }

    function initDesktopRailRevealOnHalfScroll(layout) {
        if (!layout || !layout.classList.contains('article-page-layout--rail-pending')) {
            return;
        }
        let done = false;

        function onScroll() {
            if (done) {
                return;
            }
            if (getReadingProgressPercent() < 50) {
                return;
            }
            done = true;
            layout.classList.remove('article-page-layout--rail-pending');
            const railAside = document.getElementById('article-desktop-rail-ad');
            if (railAside) {
                railAside.removeAttribute('aria-hidden');
            }
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(onScroll).catch(onScroll);
        }
        onScroll();
    }

    function injectArticleDesktopRailAd(pageType) {
        const article = document.querySelector('article.content');
        if (!article || document.getElementById('article-desktop-rail-ad')) {
            return;
        }
        if (article.querySelector('.article-page-layout')) {
            return;
        }

        const layout = document.createElement('div');
        layout.className =
            'article-page-layout article-page-layout--with-rail article-page-layout--rail-pending';

        const main = document.createElement('div');
        main.className = 'article-main-content';

        while (article.firstChild) {
            main.appendChild(article.firstChild);
        }

        const wrap = document.createElement('div');
        wrap.innerHTML = buildArticleDesktopRailMarkup(pageType);
        const rail = wrap.firstElementChild;
        if (!rail) {
            return;
        }

        const railColumn = document.createElement('div');
        railColumn.className = 'article-desktop-rail-column';
        railColumn.appendChild(rail);

        article.appendChild(layout);
        layout.appendChild(main);
        layout.appendChild(railColumn);

        article.classList.add('article--with-desktop-rail');
        const mainEl = article.closest('main');
        if (mainEl) {
            mainEl.classList.add('main--with-desktop-rail');
        }

        initDesktopRailRevealOnHalfScroll(layout);
    }

    /**
     * Vertical display ad: bordered card, full image, “Ad” badge (no overlaid headline/body).
     * Omit ctaUrl or use '#' for a non-clickable unit.
     */
    function createVerticalDisplayAd(config) {
        const {
            image,
            alt = 'Advertisement',
            ctaUrl,
            pageType = 'root'
        } = config || {};

        if (!image) {
            console.warn('createVerticalDisplayAd: image is required');
            return '';
        }

        const imgPath = resolveImagePath(image, pageType);
        const clickable = Boolean(ctaUrl && ctaUrl !== '#');
        const imgTag = `<img class="ad-vertical-img" src="${imgPath}" alt="${escapeAttr(alt)}" loading="lazy" width="300" height="600">`;

        const inner = clickable
            ? `<a class="ad-vertical-link" href="${ctaUrl}" target="_blank" rel="sponsored noopener noreferrer">${imgTag}</a>`
            : `<div class="ad-vertical-media">${imgTag}</div>`;

        return `
            <aside class="ad-section ad-vertical" data-ad="display">
              ${inner}
              <span class="ad-label">Ad</span>
            </aside>
        `.trim();
    }

    /**
     * Pacagen vertical unit with overlay copy (for sidebar stacks or manual placement).
     */
    function createPacagenVerticalAd(pageType) {
        const pt = pageType === 'blog' ? 'blog' : 'root';
        const v = PACAGEN_VERTICAL_AD;
        const imgPath = resolveImagePath(v.image, pt);

        return `
            <aside class="ad-section ad-vertical ad-vertical--pacagen" data-ad="pacagen">
              <a class="ad-vertical-link pacagen-link" href="${escapeAttr(v.ctaUrl)}" aria-label="${escapeAttr(v.hitAria)}">
                <div class="ad-vertical-media ad-vertical-media--pacagen">
                  <img class="ad-vertical-img" src="${imgPath}" alt="${escapeAttr(v.alt)}" loading="lazy" width="300" height="600">
                  <div class="ad-vertical-copy">
                    <p class="ad-vertical-kicker">${escapeHtml(v.kicker)}</p>
                    <h3 class="ad-vertical-headline">${escapeHtml(v.headline)}</h3>
                    <p class="ad-vertical-deck">${escapeHtml(v.deck)}</p>
                    <span class="ad-vertical-cta">${escapeHtml(v.ctaText)}</span>
                  </div>
                </div>
              </a>
              <span class="ad-label">Ad</span>
            </aside>
        `.trim();
    }

    function injectArticleVerticalAds(pageType) {
        const el = document.getElementById('article-vertical-ads');
        if (!el) {
            return;
        }
        const pt = pageType === 'blog' ? 'blog' : 'root';
        el.innerHTML =
            createPacagenVerticalAd(pt) +
            createVerticalDisplayAd({ image: 'adv/aesop.png', alt: 'Aesop', ctaUrl: '#', pageType: pt });
    }

    function createAd(config) {
        const {
            backgroundImage,
            logo,
            logoDark,
            headline,
            body,
            productName,
            ctaText,
            ctaUrl,
            pageType = 'root'
        } = config;
        
        if (!backgroundImage || !headline || !body) {
            console.warn('createAd: Missing required parameters');
            return '';
        }
        
        const imagePath = resolveImagePath(backgroundImage, pageType);
        const logoHTML = logo ? `<div class="ad-logo">${logo}${logoDark ? `<span class="ad-logo-dark"> ${logoDark}</span>` : ''}</div>` : '';
        
        // Insert productName into body if it exists
        let bodyHTML = body;
        if (productName) {
            bodyHTML = body.replace(new RegExp(productName, 'g'), `<span class="ad-product-name">${productName}</span>`);
        }
        
        const ctaHTML = ctaText ? `
              <div class="ad-cta-wrapper">
                <span class="ad-cta">${ctaText}</span>
              </div>` : '';
        
        const isClickable = ctaUrl && ctaUrl !== '#';
        const wrapperClass = isClickable ? 'ad-section ad ad-clickable' : 'ad-section ad';
        const wrapperTag = isClickable ? 'a' : 'div';
        const hrefAttr = isClickable ? `href="${ctaUrl}"` : '';
        
        return `
            <${wrapperTag} class="${wrapperClass}" style="background-image: url('${imagePath}');" ${hrefAttr}>
              ${logoHTML}
              <div class="ad-headline">${headline}</div>
              <div class="ad-body">
                ${bodyHTML}
              </div>
              ${ctaHTML}
              <span class="ad-label">Ad</span>
            </${wrapperTag}>
        `.trim();
    }
    
    window.createAd = createAd;
    window.createVerticalDisplayAd = createVerticalDisplayAd;
    window.createPacagenVerticalAd = createPacagenVerticalAd;
    window.createArticleBannerAd = createArticleBannerAd;
    window.createPacagenArticleBannerAd = createPacagenArticleBannerAd;
    window.injectRandomArticleBanners = injectRandomArticleBanners;
    window.injectArticleDesktopRailAd = injectArticleDesktopRailAd;
    window.injectArticleVerticalAds = injectArticleVerticalAds;
})();


