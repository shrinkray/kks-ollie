/**
 * Scroll to top button
 * uses an SVG arrow from Font Awesome
 * includes ARIA attributes
 * and is visually hidden until the user scrolls down 50% of the screen height
 */

const scrollButton = document.createElement('button');
const arrowUp = `<?xml version="1.0" ?><svg height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>`;
scrollButton.setAttribute(
    'class',
    'scroll-top flex items-center justify-center visually-hidden'
);
scrollButton.setAttribute('aria-label', 'Scroll to top of the page');
scrollButton.innerHTML = arrowUp;

// Assign click event handler with smooth scroll
scrollButton.addEventListener('click', function () {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

// Create a span element for the label
const scrollSpan = document.createElement('span');
// scrollSpan.textContent = "Scroll to Top";

// Append span to the button

scrollButton.appendChild(scrollSpan);

// Select the footer element
const footer = document.querySelector('footer');

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
