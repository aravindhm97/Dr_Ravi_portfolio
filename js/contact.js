// js/contact.js
// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you, ${firstName} ${lastName}! Your message has been sent successfully. I'll get back to you soon regarding: ${subject}`);
        
        contactForm.reset();
    });
});