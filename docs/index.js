"use strict";
// Correct usage
document.addEventListener('DOMContentLoaded', function () {
    // Ensure DOM is fully loaded before accessing elements
    const element = document.getElementById('demo');
    if (element !== null) {
        // Check if element exists before setting its innerHTML
        element.innerHTML = "This website is under construction! stay tuned for updates!";
    }
    else {
        console.error('Element does not exist');
    }
});
