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

// make the label of the search field invisible
const searchLabel = document.querySelector('.wp-block-search__label');
searchLabel.classList.add('visually-hidden');