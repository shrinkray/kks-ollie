/* Add sticky header class
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * .is-position-sticky is disabled in mobile view
 */
const siteHeader = document.querySelector('.site-header');
siteHeader.classList.add('is-position-sticky');

const siteLogos = document.querySelectorAll('.site--logo');

siteLogos.forEach(function (siteLogo) {
    // Check if siteLogo actually has a parentNode
    if (siteLogo.parentNode) {
        // Create a new anchor element
        const anchor = document.createElement('a');
        anchor.href = '/';
        anchor.title = 'Kool Kat Science - Home';

        // Copy all classes from siteLogo to anchor
        anchor.className = siteLogo.className;

        // Create a new span element
        const span = document.createElement('span');

        // Set the class name of the span to 'hidden'
        span.className = 'visually-hidden';

        // Add text to the span
        span.textContent = 'Kool Kat Science'; // Replace with your desired text

        // Append the span to the anchor
        anchor.appendChild(span);

        // Replace siteLogo with the new anchor element
        siteLogo.parentNode.replaceChild(anchor, siteLogo);
    } else {
        console.log('Parent node not found for:', siteLogo);
    }
});


/**
 * MotoPress Mega Menu https://github.com/motopress/getwid-megamenu 
 * Fixes bug where the mega menu toggle button is not accessible
 * Since the anchor appears just before and it's text can become a label
 * Code generates a unique id for each anchor and sets the aria-labelledby 
 * attribute on the button using that id
 */

// Select all instances of the div containing the anchor and button
const divs = document.querySelectorAll('.gw-mm-item__link');

// Loop through each div instance
divs.forEach((div) => {
    // Select the anchor and button within this specific div
    const anchor = div.querySelector('a');
    const button = div.querySelector('.gw-mm-item__toggle');

    // Check if both elements exist
    if (anchor && button) {
        // Generate a unique ID for the anchor
        const uniqueId = 'label-' + Math.random().toString(36).substr(2, 9);

        // Set the ID attribute on the anchor
        anchor.id = uniqueId;

        // Set the aria-labelledby attribute on the button, referencing the anchor's ID
        button.setAttribute('aria-labelledby', uniqueId);
    }
});



/**
 * MotoPress Mega Menu https://github.com/motopress/getwid-megamenu 
 * uses a down arrow icon from dashicons which is not pretty
 * Function watches for changes to the class attribute and updates it 
 */

// Function to update the class if it's not as expected
function updateButtonClass(button) {
    if (!button.classList.contains('dashicons-arrow-down-alt2')) {
        button.classList.remove('dashicons-arrow-down');
        button.classList.add('dashicons-arrow-down-alt2');
    }
}

// Create a new MutationObserver instance
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            updateButtonClass(mutation.target);
        }
    });
});

// Options for the observer (which attributes to watch)
const config = { attributes: true, attributeFilter: ['class'] };

// Select all buttons to be observed
const buttons = document.querySelectorAll('.dashicons');

// Start observing each button
buttons.forEach((button) => {
    updateButtonClass(button); // Initial check
    observer.observe(button, config);
});



/**
 * Scroll to top button
 * uses an SVG arrow from Font Awesome
 * includes ARIA attributes
 * and is visually hidden until the user scrolls down 50% of the screen height
 */

const scrollButton = document.createElement("button");
const arrowUp = `<?xml version="1.0" ?><svg height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>`;
scrollButton.setAttribute(
    'class',
    'scroll-top flex items-center justify-center visually-hidden'
);
scrollButton.setAttribute('aria-label', 'Scroll to top of the page');
scrollButton.innerHTML = arrowUp;

// Assign click event handler with smooth scroll
scrollButton.addEventListener('click', function() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

// Create a span element for the label
const scrollSpan = document.createElement("span");
// scrollSpan.textContent = "Scroll to Top";

// Append span to the button

scrollButton.appendChild(scrollSpan);

// Select the footer element
const footer = document.querySelector("footer");

// Append the button to the footer
footer.appendChild(scrollButton);

// Show the button when the user scrolls down 50% of the screen height
window.addEventListener('DOMContentLoaded', (event) => {
    var scrollTopBtn = document.getElementsByClassName('scroll-top')[0];
    var screenHeight = (screenHeight =
        window.innerHeight || document.documentElement.clientHeight);
    var halfScreenHeight = screenHeight / 2;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= halfScreenHeight) {
            scrollTopBtn.classList.remove('visually-hidden');
        } else {
            scrollTopBtn.classList.add('visually-hidden');
        }
    });
});
