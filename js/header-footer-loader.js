// js/header-footer-loader.js
// Load header and footer from external files
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Update active link based on current page
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-links a');
            
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
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
    fetch('templates/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

        // Navigation active link handler
        document.addEventListener('DOMContentLoaded', function() {
            // Get current page name from URL
            const path = window.location.pathname;
            const page = path.substring(path.lastIndexOf('/') + 1) || '../index.html';
            
            // Get all navigation links
            const navLinks = document.querySelectorAll('.nav-links a');
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // Compare the href with current page
                const linkPath = link.getAttribute('href');
                const linkPage = linkPath.substring(linkPath.lastIndexOf('/') + 1);
                
                // Handle relative paths (../page.html)
                if (linkPage.startsWith('../')) {
                    const simpleLinkPage = linkPage.substring(3);
                    if (page === simpleLinkPage) {
                        link.classList.add('active');
                    }
                } 
                // Handle same directory paths (page.html)
                else if (page === linkPage) {
                    link.classList.add('active');
                }
            });
            
            // Add mobile menu functionality
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
        });