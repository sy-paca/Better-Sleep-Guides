// Article Footer Component
// Standard article footer with links - matches main site footer
// Usage: createArticleFooter({ pageType: 'root' })

(function() {
    'use strict';
    
    function createArticleFooter(config = {}) {
        const { pageType = 'root' } = config;
        if (typeof buildSiteFooterHTML === 'function') {
            return buildSiteFooterHTML(pageType);
        }
        const p = pageType === 'blog' ? '../' : '';
        return (
            '<footer class="site-footer site-footer--fallback" role="contentinfo">' +
            '<div class="site-footer-inner"><p class="site-footer-copy">&copy; 2026 Better Sleep Guides.</p>' +
            '<p><a href="' + p + 'privacy-policy.html">Privacy Policy</a> · <a href="' + p + 'terms-of-service.html">Terms of Service</a></p></div></footer>'
        );
    }
    
    window.createArticleFooter = createArticleFooter;
})();

