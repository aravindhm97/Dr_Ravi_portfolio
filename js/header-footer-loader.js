// js/header-footer-loader.js
// Load header and footer from external files
// Load header and footer from external files
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('./templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Navigation active link handler
            const currentUrl = window.location.href;
            const navLinks = document.querySelectorAll('.nav-links a');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // Compare full absolute URLs (browser handles path resolution)
                if (currentUrl === link.href) {
                    link.classList.add('active');
                }
            });
            
            // Add hamburger menu functionality
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-links');
            
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
                
                // Close mobile menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                        navMenu.classList.remove('active');
                    }
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('./templates/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});