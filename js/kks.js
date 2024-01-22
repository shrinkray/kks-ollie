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
 * Replace Search button with Search icon
 */

document.addEventListener('DOMContentLoaded', function () {
    // Find the search button
    const searchButton = document.querySelector('.wp-block-search__button');

    // Create a span element and assign the 'visually-hidden' class
    const searchSpan = document.createElement('span');
    searchSpan.className = 'visually-hidden';
    searchSpan.textContent = searchButton.textContent.trim();

    // Clear the existing text inside the button
    searchButton.textContent = '';

    // Append the span to the button
    searchButton.appendChild(searchSpan);

    // Create an SVG element
    const svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );
    svgElement.setAttribute('width', '30');
    svgElement.setAttribute('height', '30');
    svgElement.setAttribute('aria-hidden', 'true'); // Hide from screen readers
    svgElement.innerHTML =
        '<path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-5.09C15.1 4.61 12.28 2 9 2S2.9 4.61 2.9 8.64s2.82 6.64 6.1 6.64c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6.5 0C7.01 14 5 11.98 5 9.5S7.01 5 9.5 5 14 7.02 14 9.5 11.99 14 9 14z"></path>';


    // Append the SVG to the button
    searchButton.appendChild(svgElement);
});

