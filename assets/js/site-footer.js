/**
 * Shared site footer — brand column + guides column; mauve palette.
 * Must load before main.js and article-footer.js.
 */
(function (global) {
    'use strict';

    function buildSiteFooterHTML(pageType) {
        var p = pageType === 'blog' ? '../' : '';
        var home = p + 'index.html';
        var blogs = p + 'blogs.html';
        var privacyPath = p + 'privacy-policy.html';
        var termsPath = p + 'terms-of-service.html';

        var hashLatest = home + '#the-latest';
        var hashTrending = home + '#trending-now';
        var hashRoutine = home + '#category-routine';
        var hashWellness = home + '#category-wellness';
        var hashProduct = home + '#category-product';
        var hashReview = home + '#category-testing';

        var envelopeSvg = '<svg class="site-footer-input-icon" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876L5.747 8.207 2.1 10.275 2 12h12l-.034-1.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>';

        return (
            '<footer class="site-footer" role="contentinfo">' +
            '<div class="site-footer-inner">' +
            '<div class="site-footer-col site-footer-col--brand">' +
            '<a href="' + home + '" class="site-footer-wordmark">Better Sleep Guides</a>' +
            '<p class="site-footer-tagline">We don\u2019t keep our sleep secrets.</p>' +
            '<form class="site-footer-newsletter" action="#" method="get" aria-label="Email newsletter signup" onsubmit="return false">' +
            '<div class="site-footer-newsletter-row">' +
            '<label class="site-footer-newsletter-field">' +
            '<span class="visually-hidden">Email address</span>' +
            envelopeSvg +
            '<input type="email" name="email" autocomplete="email" placeholder="you@example.com" class="site-footer-input">' +
            '</label>' +
            '<button type="button" class="site-footer-subscribe">Subscribe</button>' +
            '</div>' +
            '</form>' +
            '<ul class="site-footer-social" aria-label="Social media">' +
            '<li><a href="https://www.instagram.com/bettersleepguides/" target="_blank" rel="noopener noreferrer">Instagram</a></li>' +
            '</ul>' +
            '</div>' +
            '<nav class="site-footer-col site-footer-col--guides" aria-label="Guides and topics">' +
            '<div class="site-footer-link-cols">' +
            '<ul class="site-footer-list">' +
            '<li><a href="' + hashRoutine + '">Routine</a></li>' +
            '<li><a href="' + hashWellness + '">Wellness</a></li>' +
            '<li><a href="' + hashProduct + '">Product</a></li>' +
            '<li><a href="' + hashReview + '">Review</a></li>' +
            '</ul>' +
            '<ul class="site-footer-list">' +
            '<li><a href="' + hashLatest + '">The Latest</a></li>' +
            '<li><a href="' + hashTrending + '">Trending</a></li>' +
            '<li><a href="' + blogs + '">All articles</a></li>' +
            '</ul>' +
            '</div>' +
            '</nav>' +
            '</div>' +
            '<div class="site-footer-bottom">' +
            '<p class="site-footer-copy">&copy; 2026 Better Sleep Guides. All rights reserved.</p>' +
            '<p class="site-footer-legal-inline">' +
            '<a href="' + privacyPath + '">Privacy Policy</a>' +
            '<span class="site-footer-legal-sep" aria-hidden="true"> · </span>' +
            '<a href="' + termsPath + '">Terms of Service</a>' +
            '</p>' +
            '</div>' +
            '</footer>'
        );
    }

    global.buildSiteFooterHTML = buildSiteFooterHTML;
})(typeof window !== 'undefined' ? window : this);
