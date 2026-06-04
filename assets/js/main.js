// Main JavaScript file for Better Sleep Guides

// Head Component - Insert favicon and stylesheets
function insertHeadElements(pageType = 'root') {
    // Determine the correct path based on page type
    const assetPath = pageType === 'blog' ? '../assets' : 'assets';
    
    // Check if favicon elements already exist to prevent duplicates
    const faviconExists = document.querySelector('link[rel="icon"]');
    
    // Only add favicon links if they don't exist
    if (!faviconExists) {
    // Create the head elements
    const headElements = `
        <!-- Favicon (Better Sleep Guides) -->
            <link rel="icon" href="/favicon.ico" sizes="any">
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/bsg-favicon-16x16.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/bsg-favicon-32x32.png">
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
            <link rel="manifest" href="/assets/images/favicon/site.webmanifest">

        <!-- Additional Meta Tags -->
            <meta name="theme-color" content="#C9A8B8">
            <meta name="msapplication-TileColor" content="#C9A8B8">
    `;
    
    // Insert the elements into the head
    document.head.insertAdjacentHTML('beforeend', headElements);
    }
    
    // Always load stylesheets (check if already loaded)
    const styleSheetExists = document.querySelector(`link[href*="${assetPath}/css/style.css"]`) || 
                             document.querySelector('link[href*="style.css"]');
    
    if (!styleSheetExists) {
    loadStylesheets(assetPath);
    } else {
        // Stylesheets already loaded, show content immediately
        setTimeout(() => {
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Load stylesheets and show content when ready
function loadStylesheets(assetPath) {
    let stylesheetsLoaded = 0;
    const totalStylesheets = 2;
    let contentShown = false;
    
    function showContent() {
        if (!contentShown) {
            contentShown = true;
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }
    }
    
    function onStylesheetLoad() {
        stylesheetsLoaded++;
        if (stylesheetsLoaded === totalStylesheets) {
            // All stylesheets loaded, show the content
            showContent();
        }
    }
    
    // Fallback: Show content after 2 seconds even if CSS doesn't load
    setTimeout(showContent, 2000);
    
    // Load main stylesheet
    const mainCSS = document.createElement('link');
    mainCSS.rel = 'stylesheet';
    mainCSS.href = `${assetPath}/css/style.css`;
    mainCSS.onload = onStylesheetLoad;
    mainCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(mainCSS);
    
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';
    bootstrapCSS.integrity = 'sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr';
    bootstrapCSS.crossOrigin = 'anonymous';
    bootstrapCSS.onload = onStylesheetLoad;
    bootstrapCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(bootstrapCSS);
}

// Navigation Component - Insert navigation HTML
function insertNavigation(pageType = 'root', currentPage = '') {
    // Determine the correct paths based on page type
    const homePath = pageType === 'blog' ? '../index.html' : 'index.html';
    const logoPath = pageType === 'blog' ? '../assets/images/logo/bsg-logo.png' : 'assets/images/logo/bsg-logo.png';
    
    // Check if we're on an article page (has article-fold element)
    const isArticlePage = document.getElementById('article-fold') !== null;
    
    // Create navigation HTML - show brand text only on non-article pages
    const brandTextHTML = isArticlePage ? '' : '<span class="brand-text">Better Sleep Guides</span>';
    const isHomePage = document.body.classList.contains('page-home');
    const isBlogsListing = document.body.classList.contains('page-blogs');
    const blogsListPath = pageType === 'blog' ? 'index.html' : 'blogs.html';
    const hashLatest = pageType === 'blog' ? '../index.html#the-latest' : 'index.html#the-latest';
    const hashTrending = pageType === 'blog' ? '../index.html#trending-now' : 'index.html#trending-now';
    const hashRoutine = pageType === 'blog' ? '../index.html#category-routine' : 'index.html#category-routine';
    const hashWellness = pageType === 'blog' ? '../index.html#category-wellness' : 'index.html#category-wellness';
    const hashProduct = pageType === 'blog' ? '../index.html#category-product' : 'index.html#category-product';
    const hashReview = pageType === 'blog' ? '../index.html#category-testing' : 'index.html#category-testing';

    const mastheadSearchIcon = `<svg class="header-masthead-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>`;

    const mastheadScrollProgressHTML = isHomePage
        ? ''
        : `
            <div class="header-scroll-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="header-scroll-progress-fill"></div>
            </div>`;

    let navigationHTML;
    if (isHomePage || isArticlePage || isBlogsListing) {
        navigationHTML = `
        <header class="header-home header-masthead">
            <div class="header-masthead-inner">
                <div class="header-masthead-top">
                    <a href="${homePath}" class="header-masthead-brand">
                        <img src="${logoPath}" alt="Better Sleep Guides" width="120" height="120" id="logo" class="header-masthead-logo">
                        <span class="header-masthead-wordmark">Better Sleep Guides</span>
                    </a>
                    <p class="header-masthead-tagline">Rest, routine, and mornings that actually feel clear.</p>
                </div>
                <div class="header-masthead-bar">
                    <nav class="header-masthead-cats" aria-label="Primary">
                        <a href="${hashRoutine}">Routine</a>
                        <a href="${hashWellness}">Wellness</a>
                        <a href="${hashProduct}">Product</a>
                        <a href="${hashReview}">Review</a>
                        <a href="${hashLatest}">The Latest</a>
                        <a href="${hashTrending}">Trending</a>
                        <a href="${blogsListPath}">All Stories</a>
                    </nav>
                    <a href="${blogsListPath}" class="header-masthead-search" aria-label="Browse all articles">${mastheadSearchIcon}</a>
                </div>
            </div>${mastheadScrollProgressHTML}
        </header>`;
    } else {
        navigationHTML = `
        <header>
            <nav>
                <a href="${homePath}" class="nav-brand">
                    <img src="${logoPath}" alt="Better Sleep Guides Logo" id="logo">
                    ${brandTextHTML}
                </a>
            </nav>
            <div class="header-scroll-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="header-scroll-progress-fill"></div>
            </div>
        </header>`;
    }
    
    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
}

// Footer Component - Insert footer HTML
function insertFooter(pageType = 'root') {
    const p = pageType === 'blog' ? '../' : '';
    const privacyPath = p + 'privacy-policy.html';
    const termsPath = p + 'terms-of-service.html';
    const footerHTML =
        typeof buildSiteFooterHTML === 'function'
            ? buildSiteFooterHTML(pageType)
            : `<footer class="site-footer site-footer--fallback" role="contentinfo"><div class="site-footer-inner"><p class="site-footer-copy">&copy; 2026 Better Sleep Guides.</p><p><a href="${privacyPath}">Privacy Policy</a> · <a href="${termsPath}">Terms of Service</a></p></div></footer>`;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Load components immediately when script loads (before DOM ready)
(function() {
    // Check if we're in a blog subdirectory
    const isInBlog = window.location.pathname.includes('/blog/');
    const pageType = isInBlog ? 'blog' : 'root';
    
    // Determine current page for active state
    let currentPage = '';
    if (window.location.pathname.includes('/blog/')) {
        currentPage = 'blog';
    } else if (window.location.pathname.includes('quiz.html')) {
        currentPage = 'quiz';
    }
    
    // Insert head elements immediately
    insertHeadElements(pageType);
    
    // Insert navigation and footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            /* Use .header-masthead — not `nav` — or site-footer's <nav> blocks the masthead on articles
               whose init runs before this listener (e.g. no waitForProduct). */
            if (!document.querySelector('.header-masthead')) {
                insertNavigation(pageType, currentPage);
            }
            // Only insert main footer if there's no article-footer element (article pages handle their own footer)
            if (!document.querySelector('footer') && !document.getElementById('article-footer')) {
                insertFooter(pageType);
            }
        });
    } else {
        // DOM already loaded
        if (!document.querySelector('.header-masthead')) {
            insertNavigation(pageType, currentPage);
        }
        // Only insert main footer if there's no article-footer element (article pages handle their own footer)
        if (!document.querySelector('footer') && !document.getElementById('article-footer')) {
            insertFooter(pageType);
        }
    }
})();

function initHeaderScrollProgress() {
    var header = document.querySelector('body > header');
    var fill = header && header.querySelector('.header-scroll-progress-fill');
    if (!header || !fill) return;

    function updateProgress() {
        var docEl = document.documentElement;
        var scrollable = docEl.scrollHeight - docEl.clientHeight;
        var pct = 0;
        if (scrollable > 0) {
            pct = Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
        }
        fill.style.width = pct + '%';
        var bar = header.querySelector('.header-scroll-progress');
        if (bar) {
            bar.setAttribute('aria-valuenow', String(Math.round(pct)));
        }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateProgress).catch(updateProgress);
    }
    updateProgress();
}

// Wait for DOM to be fully loaded for additional functionality
document.addEventListener('DOMContentLoaded', function() {
    initHeaderScrollProgress();

    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});