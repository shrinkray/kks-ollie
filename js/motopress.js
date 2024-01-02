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
        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {
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
