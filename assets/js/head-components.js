// Head Components
// Handles FOUC prevention and Converge tracking initialization
// Usage: Include in <head> before other scripts

(function() {
    'use strict';
    
    /**
     * Initialize FOUC (Flash of Unstyled Content) prevention
     */
    function initFOUCPrevention() {
        // Add FOUC prevention styles if not already present
        if (!document.querySelector('#fouc-prevention')) {
            const style = document.createElement('style');
            style.id = 'fouc-prevention';
            style.textContent = `
                body {
                    visibility: hidden;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .no-js body {
                    visibility: visible;
                    opacity: 1;
                }
            `;
            document.head.insertBefore(style, document.head.firstChild);
        }
        
        // Add JS class to html element
        if (!document.documentElement.classList.contains('js')) {
            document.documentElement.className += ' js';
        }
    }
    
    /**
     * Initialize Converge tracking
     */
    function initConvergeTracking() {
        // Check if already initialized
        if (window.cvg) {
            return;
        }
        
        // Initialize Converge
        window.cvg || (cvg = function () { 
            cvg.process ? cvg.process.apply(cvg, arguments) : cvg.queue.push(arguments) 
        }, cvg.queue = []);
        
        // Track page load
        cvg({ method: "track", eventName: "$page_load" });
        cvg({ method: "link_domain", domain: "pacagen.com" });
        
        // Load Converge script
        const script = document.createElement('script');
        script.src = 'https://static.runconverge.com/pixels/AlO7bK.js';
        script.async = true;
        document.head.appendChild(script);
    }
    
    /**
     * Initialize Meta Pixel tracking
     */
    function initMetaPixel() {
        if (window.fbq) return;
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '963941459935470');
        fbq('track', 'PageView');
    }

    /**
     * Initialize all head components
     */
    function initHeadComponents() {
        initFOUCPrevention();
        initConvergeTracking();
        initMetaPixel();
    }
    
    // Auto-initialize when script loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeadComponents);
    } else {
        initHeadComponents();
    }
})();

