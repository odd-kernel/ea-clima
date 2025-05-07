document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navbar = document.getElementById('navbar');

    if (mobileMenuButton && navbar) {
        mobileMenuButton.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Consider header height for accurate scroll position
                const headerOffset = document.getElementById('main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Optional: Remove class if you want animation to repeat on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Active Nav Link Highlighting on Scroll (Optional but good for UX)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const headerHeight = document.getElementById('main-header').offsetHeight;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 50; // Adjusted for header and a little offset
            let sectionId = current.getAttribute('id');
            
            /*
            If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
            To know which link on screen is active, we use sectionId variable we are getting while looping through sections as an selector
            */
            const navLink = document.querySelector('#navbar a[href*="' + sectionId + '"]');
            if (navLink) { // Check if the link exists
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    // Contact Form Submission (Basic - prevent default and log for now)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real scenario, you would handle form submission here (e.g., via AJAX)
            console.log('Form submitted!');
            alert('Gracias por su mensaje. Nos pondremos en contacto con usted pronto.');
            contactForm.reset(); // Reset form after submission
        });
    }

});

