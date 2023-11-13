/* Add sticky header class
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * .is-position-sticky is disabled in mobile view
 */
const siteHeader = document.querySelector('.site-header');
siteHeader.classList.add('is-position-sticky');

// Select all elements with .site--logo class
const siteLogos = document.querySelectorAll('.site--logo');

siteLogos.forEach(function (siteLogo) {
    // Check if siteLogo actually has a parentNode
    if (siteLogo.parentNode) {
        // Create a new anchor element
        const anchor = document.createElement('a');
        anchor.href = '/';
        anchor.target = '_self';

        // Copy all classes from siteLogo to anchor
        anchor.className = siteLogo.className;

        // Replace siteLogo with the new anchor element
        siteLogo.parentNode.replaceChild(anchor, siteLogo);
    } else {
        console.log('Parent node not found for:', siteLogo);
    }
});
