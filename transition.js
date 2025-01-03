document.addEventListener('DOMContentLoaded', () => {
    // Initialize Barba.js for smooth transitions
    barba.init({
        transitions: [{
            name: 'default-transition',
            // Leave transition (before the page changes)
            leave(data) {
                return new Promise(resolve => {
                    // Remove any previously dynamically loaded stylesheets
                    removeDynamicStylesheets();
                    
                    // Fade out the current page
                    gsap.to(data.current.container, { 
                        opacity: 0, 
                        duration: 0.5, 
                        onComplete: resolve 
                    });
                });
            },
            // Enter transition (after the page has changed)
            enter(data) {
                return new Promise(resolve => {
                    // Dynamically load CSS and JS for the new page
                    loadCSS(data.next.url);
                    loadJS(data.next.url);

                    // Fade in the new page
                    gsap.from(data.next.container, { 
                        opacity: 0, 
                        duration: 0.5, 
                        onComplete: resolve 
                    });
                });
            }
        }],

        // Run after the transition completes
        afterEnter(data) {
            console.log('Transition completed and new page is ready!');
            
            // Call any page-specific initialization functions here
            initPageFeatures(data.next.url);
        }
    });

    // Function to remove previously dynamically loaded stylesheets
    function removeDynamicStylesheets() {
        const dynamicLinks = document.querySelectorAll('link[data-dynamic="true"]');
        dynamicLinks.forEach(link => link.remove());
    }

    // Function to dynamically load the correct CSS file based on the page URL
    function loadCSS(url) {
        const pageName = extractPageName(url);
        let cssFile;

        // Determine which CSS file to load based on the page
        switch(pageName) {
            case 'index':
                cssFile = 'style.css';
                break;
            case 'about':
                cssFile = 'styles.css';
                break;
            case 'waterside':
                cssFile = 'waterside.css';
                break;
            case 'postcard':
                cssFile = 'postcard.css';
                break;
            default:
                cssFile = 'style.css'; // Default CSS file (fallback)
        }

        // Create a <link> tag for the CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `css/${cssFile}`;
        link.setAttribute('data-dynamic', 'true'); // Mark as dynamically added
        document.head.appendChild(link);
    }

    // Function to dynamically load the correct JS file based on the page URL
    function loadJS(url) {
        const pageName = extractPageName(url);
        let jsFile;

        // Determine which JS file to load based on the page
        switch(pageName) {
            case 'index':
                jsFile = ''; // index.html doesn't have a specific JS file
                break;
            case 'about':
                jsFile = ''; // about.html doesn't have a specific JS file
                break;
            case 'waterside':
                jsFile = ''; // waterside.js is specific to the waterside page
                break;
            case 'postcard':
                jsFile = 'postcard.js'; // postcard.js is specific to the postcard page
                break;
            default:
                jsFile = ''; // Default (no JS file)
        }

        if (jsFile) {
            const script = document.createElement('script');
            script.src = `js/${jsFile}`;
            script.onload = () => {
                console.log(`${jsFile} loaded successfully`);
            };
            script.onerror = () => {
                console.error(`Failed to load ${jsFile}`);
            };
            document.body.appendChild(script);
        }
    }

    // Page-specific feature initialization
    function initPageFeatures(url) {
        const pageName = extractPageName(url);

        switch(pageName) {
            case 'index':
                // Initialize any index page-specific features here
                console.log('Index page features initialized');
                break;
            case 'about':
                // Initialize any about page-specific features here
                console.log('About page features initialized');
                break;
            case 'waterside':
                // Initialize features specific to waterside page
                console.log('Waterside page features initialized');
                break;
            case 'postcard':
                // Initialize features specific to postcard page
                console.log('Postcard page features initialized');
                break;
            default:
                console.log('Initializing default features');
        }
    }

    // Utility function to extract page name from URL
    function extractPageName(url) {
        // Handle both full URLs and relative paths
        const pathname = typeof url === 'string' ? url : url.pathname;
        return pathname.split('/').pop().replace('.html', '') || 'index';
    }
});