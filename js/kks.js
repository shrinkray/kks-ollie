/* Add sticky header class
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * .is-position-sticky is disabled in mobile view
 */
const siteHeader = document.querySelector('.site-header');
siteHeader.classList.add('is-position-sticky');

// Replace div element with .site--logo class as anchor element, keep all classes, and add href attribute and target self
const siteLogo = document.querySelectorAll('.site--logo');
const anchor = document.createElement('a');
anchor.href = '/';
anchor.classList = siteLogo.classList;
anchor.target = '_self';
siteLogo.parentNode.replaceChild(anchor, siteLogo);
