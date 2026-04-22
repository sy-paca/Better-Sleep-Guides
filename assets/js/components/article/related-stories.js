// Related stories strip at end of articles
// Usage: createRelatedStories({ pageType: 'root', excludeId: 'sleep-hygiene-tips.html' })

(function () {
    'use strict';

    var ARTICLES = {
        '5-small-routines-for-better-sleep.html': {
            title: '5 Small Routines Before Bed That Help You Sleep Well',
            image: 'article-1-hero.jpg',
            imageAlt: 'Night routine for better sleep'
        },
        'morning-routine-better-sleep.html': {
            title: 'How Your Morning Routine Affects Your Sleep',
            image: 'article-5-hero.jpg',
            imageAlt: 'Morning routine for better sleep'
        },
        'stop-wasting-your-sleep.html': {
            title: 'Stop Wasting Your Sleep: 5 Secrets to Truly Feeling Rested',
            image: 'header-main-image.png',
            imageAlt: 'Woman resting with a pillow'
        },
        'wake-up-10-times-a-night.html': {
            title: 'Millions Fall Asleep Easily — But Wake Up 5–10 Times a Night Without Realizing It. A New Sleep Solution Is Going Viral.',
            image: 'wake-up-hero-1.jpg',
            imageAlt: 'Waking up multiple times at night'
        },
        'sleep-hygiene-tips.html': {
            title: 'Essential Sleep Hygiene Tips for Better Rest',
            image: 'article-3-hero.jpg',
            imageAlt: 'Sleep hygiene tips'
        },
        'insomnia-solutions.html': {
            title: 'Natural Insomnia Solutions That Actually Work',
            image: 'article-4-hero.jpg',
            imageAlt: 'Insomnia solutions'
        },
        'best-sleep-products.html': {
            title: 'Best Sleep Products to Transform Your Bedtime Routine',
            image: 'article-2-hero.jpg',
            imageAlt: 'Best sleep products'
        },
        'we-tested-sleep-aids.html': {
            title: 'We Spent 4 Months Testing 5 Popular Sleep Supplements — Here\'s What Actually Works',
            image: 'ksm-66.png',
            imageAlt: 'Sleep supplements testing'
        }
    };

    /** Two related filenames per article (not including self). */
    var RELATED = {
        '5-small-routines-for-better-sleep.html': ['morning-routine-better-sleep.html', 'sleep-hygiene-tips.html'],
        'morning-routine-better-sleep.html': ['5-small-routines-for-better-sleep.html', 'stop-wasting-your-sleep.html'],
        'stop-wasting-your-sleep.html': ['sleep-hygiene-tips.html', 'wake-up-10-times-a-night.html'],
        'wake-up-10-times-a-night.html': ['stop-wasting-your-sleep.html', 'we-tested-sleep-aids.html'],
        'sleep-hygiene-tips.html': ['insomnia-solutions.html', 'stop-wasting-your-sleep.html'],
        'insomnia-solutions.html': ['sleep-hygiene-tips.html', 'we-tested-sleep-aids.html'],
        'best-sleep-products.html': ['we-tested-sleep-aids.html', '5-small-routines-for-better-sleep.html'],
        'we-tested-sleep-aids.html': ['best-sleep-products.html', 'insomnia-solutions.html']
    };

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function createRelatedStories(config) {
        var pageType = config && config.pageType === 'blog' ? 'blog' : 'root';
        var excludeId = config && config.excludeId;
        if (!excludeId || !RELATED[excludeId]) {
            return '';
        }

        var base = pageType === 'blog' ? '../' : '';
        var imgBase = pageType === 'blog' ? '../assets/images/' : 'assets/images/';

        var ids = RELATED[excludeId];
        var rows = ids.map(function (id) {
            var a = ARTICLES[id];
            if (!a) return '';
            return (
                '<a class="article-related-row" href="' + base + id + '">' +
                '<span class="article-related-row-title">' + escapeHtml(a.title) + '</span>' +
                '<span class="article-related-row-thumb">' +
                '<img src="' + imgBase + a.image + '" width="440" height="330" alt="' + escapeHtml(a.imageAlt) + '" loading="lazy">' +
                '</span></a>'
            );
        }).join('');

        return (
            '<aside class="article-related" aria-label="Related stories">' +
            '<div class="article-related-heading">' +
            '<span class="article-related-heading-line" aria-hidden="true"></span>' +
            '<h2 class="article-related-title">Related stories</h2>' +
            '<span class="article-related-heading-line" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="article-related-list">' + rows + '</div>' +
            '</aside>'
        );
    }

    window.createRelatedStories = createRelatedStories;
})();
