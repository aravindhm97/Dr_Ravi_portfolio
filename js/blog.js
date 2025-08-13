// js/blog.js
// Blog Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.getElementById('blogGrid');
    const blogModal = document.getElementById('blogModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalDate = document.querySelector('.modal-date');
    const modalContent = document.querySelector('.modal-content-text');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slideshowImages = document.querySelectorAll('.slideshow-image');
    const dots = document.querySelectorAll('.dot');
    
    // Pagination elements
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    
    // Configuration
    const POSTS_PER_PAGE = 9;
    let currentPage = 1;
    let totalPages = 1;
    
    // Function to show slide with smooth animation
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;
    
    const showSlide = (n, direction = 'next') => {
        if (isAnimating) return;
        isAnimating = true;
        
        const totalImages = slideshowImages.length;
        
        // Calculate new slide index
        let newSlide = n;
        if (n >= totalImages) newSlide = 0;
        if (n < 0) newSlide = totalImages - 1;
        
        // Get current active image
        const currentImage = document.querySelector('.slideshow-image.active');
        const nextImage = slideshowImages[newSlide];
        
        // Set initial positions based on direction
        if (direction === 'next') {
            // Next slide: current slides left, next slides in from right
            currentImage.classList.remove('active');
            currentImage.classList.add('prev');
            nextImage.classList.remove('prev');
            nextImage.classList.add('active');
            nextImage.style.transform = 'translateX(100%)';
            nextImage.style.opacity = '0';
            
            // Trigger animation
            setTimeout(() => {
                currentImage.style.transform = 'translateX(-100%)';
                currentImage.style.opacity = '0';
                nextImage.style.transform = 'translateX(0)';
                nextImage.style.opacity = '1';
            }, 20);
        } else {
            // Previous slide: current slides right, previous slides in from left
            currentImage.classList.remove('active');
            currentImage.classList.add('prev');
            nextImage.classList.remove('prev');
            nextImage.classList.add('active');
            nextImage.style.transform = 'translateX(-100%)';
            nextImage.style.opacity = '0';
            
            // Trigger animation
            setTimeout(() => {
                currentImage.style.transform = 'translateX(100%)';
                currentImage.style.opacity = '0';
                nextImage.style.transform = 'translateX(0)';
                nextImage.style.opacity = '1';
            }, 20);
        }
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[newSlide].classList.add('active');
        
        // Reset after animation completes
        setTimeout(() => {
            // Clean up classes
            currentImage.classList.remove('prev');
            currentImage.style.transform = '';
            currentImage.style.opacity = '';
            
            // Update current slide
            currentSlide = newSlide;
            isAnimating = false;
        }, 700);
    };
    
    // Start slideshow with 3-second interval
    const startSlideshow = () => {
        stopSlideshow(); // Clear any existing interval
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1, 'next');
        }, 3000); // 3 seconds interval
    };
    
    // Stop slideshow
    const stopSlideshow = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    };
    
    // Next/previous controls
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopSlideshow();
        showSlide(currentSlide + 1, 'next');
        setTimeout(startSlideshow, 3000);
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopSlideshow();
        showSlide(currentSlide - 1, 'prev');
        setTimeout(startSlideshow, 3000);
    });
    
    // Dot controls
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            const direction = i > currentSlide ? 'next' : 'prev';
            showSlide(i, direction);
            setTimeout(startSlideshow, 3000);
        });
    });
    
    // Pause slideshow on hover
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            stopSlideshow();
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
    
    // Create blog card element
    const createBlogCard = (post) => {
        const card = document.createElement('div');
        card.className = 'blog-card animate-on-scroll';
        card.setAttribute('data-id', post.id);
        card.setAttribute('data-title', post.title);
        card.setAttribute('data-date', post.date);
        card.setAttribute('data-content', post.content);
        
        card.innerHTML = `
            <div class="blog-img" style="background-image: url('${post.image}')"></div>
            <div class="blog-content">
                <div class="blog-date">${post.date}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return card;
    };
    
    // Display posts for current page
    const displayPosts = (page) => {
        blogGrid.innerHTML = '';
        
        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const pagePosts = blogPosts.slice(startIndex, endIndex);
        
        pagePosts.forEach(post => {
            const card = createBlogCard(post);
            blogGrid.appendChild(card);
        });
        
        // Update pagination info
        currentPageSpan.textContent = page;
        totalPagesSpan.textContent = totalPages;
        
        // Update button states
        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = page === totalPages;
        
        // Re-initialize animation on scroll
        setTimeout(() => {
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.animate-on-scroll');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.5;
                    
                    if (elementPosition < screenPosition) {
                        element.classList.add('visible');
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Call immediately
        }, 100);
    };
    
    // Initialize pagination
    const initPagination = () => {
        totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
        displayPosts(currentPage);
    };
    
    // Open modal with specific blog content
    const openModal = (card) => {
        const id = parseInt(card.getAttribute('data-id'));
        const post = blogPosts.find(p => p.id === id);
        
        if (!post) return;
        
        // Update modal content
        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalContent.innerHTML = `<p>${post.content}</p>`;
        
        // Update slideshow images
        const images = post.images || [
            'images/slideshow1.jpg',
            'images/slideshow2.jpg',
            'images/slideshow3.jpg'
        ];
        
        // Update slideshow images
        for (let i = 0; i < slideshowImages.length; i++) {
            if (i < images.length) {
                slideshowImages[i].src = images[i];
                slideshowImages[i].style.display = 'block';
                slideshowImages[i].classList.remove('active', 'prev');
                slideshowImages[i].style.transform = '';
                slideshowImages[i].style.opacity = '';
            } else {
                slideshowImages[i].style.display = 'none';
            }
        }
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i < images.length) {
                dot.style.display = 'inline-block';
                dot.classList.remove('active');
            } else {
                dot.style.display = 'none';
            }
        });
        
        // Show first image
        if (slideshowImages[0]) {
            slideshowImages[0].classList.add('active');
            slideshowImages[0].style.transform = 'translateX(0)';
            slideshowImages[0].style.opacity = '1';
        }
        if (dots[0]) {
            dots[0].classList.add('active');
        }
        
        currentSlide = 0;
        
        // Show modal
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start slideshow
        setTimeout(startSlideshow, 500);
    };
    
    // Event delegation for blog cards
    blogGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.blog-card');
        if (!card) return;
        
        // Prevent modal from opening when clicking on the read-more link
        if (e.target.closest('.read-more')) {
            return;
        }
        
        e.preventDefault();
        openModal(card);
    });
    
    // Read more links
    blogGrid.addEventListener('click', (e) => {
        if (e.target.closest('.read-more')) {
            e.preventDefault();
            
            // Find the parent blog card
            const card = e.target.closest('.blog-card');
            if (!card) return;
            
            openModal(card);
        }
    });
    
    // Pagination event listeners
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPosts(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPosts(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        blogModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopSlideshow();
    });
    
    // Close modal when clicking outside
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            stopSlideshow();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogModal.classList.contains('active')) {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            stopSlideshow();
        }
    });
    
    // Initialize the blog page
    initPagination();
});