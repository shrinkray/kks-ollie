/* Add sticky header class
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * .is-position-sticky is disabled in mobile view
 * Moved search functionality to search.js, have dropped this from the webpack.mix.js file
 * Moved motoPress functionality to motopress.js
 * Moved scroll to top functionality to scrolltop.js
 */
const siteHeader = document.querySelector('.site-header')
const siteLogos = document.querySelectorAll('.site--logo')

siteHeader.classList.add('is-position-sticky')

siteLogos.forEach(function (siteLogo) {
    // Check if siteLogo actually has a parentNode
    if (siteLogo.parentNode) {
        // Create a new anchor element
        const anchor = document.createElement('a')
        anchor.href = '/';
        anchor.title = 'Kool Kat Science - Home'

        // Copy all classes from siteLogo to anchor
        anchor.className = siteLogo.className

        // Create a new span element
        const span = document.createElement('span')

        // Set the class name of the span to 'hidden'
        span.className = 'visually-hidden'

        // Add text to the span
        span.textContent = 'Kool Kat Science' // Replace with your desired text

        // Append the span to the anchor
        anchor.appendChild(span)

        // Replace siteLogo with the new anchor element
        siteLogo.parentNode.replaceChild(anchor, siteLogo)
    } else {
        console.log('Parent node not found for:', siteLogo)
    }
});

// make the label of the search field invisible
const searchLabel = document.querySelector('.wp-block-search__label')
searchLabel.classList.add('visually-hidden')
