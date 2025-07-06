document.addEventListener('DOMContentLoaded', function() {
    const nameText = document.getElementById('nameText');
    const name = 'Anvit Tandon';
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Enable scrolling immediately - don't block user interaction
    document.body.style.overflow = 'auto';
    
    // Create letter elements
    name.split('').forEach((char, index) => {
        const letter = document.createElement('span');
        letter.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
        letter.className = 'letter';
        
        // Set random starting position from screen edges
        const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Adjust starting positions for mobile to prevent off-screen issues
        const mobileOffset = isMobile ? 100 : 0; // Smaller offset for mobile
        
        switch(edge) {
            case 0: // from top
                letter.style.transform = `translate(${(Math.random() * (screenWidth - 200)) - (screenWidth/2) + 100}px, ${-screenHeight + mobileOffset}px)`;
                break;
            case 1: // from right
                letter.style.transform = `translate(${screenWidth - mobileOffset}px, ${(Math.random() * (screenHeight - 200)) - (screenHeight/2) + 100}px)`;
                break;
            case 2: // from bottom
                letter.style.transform = `translate(${(Math.random() * (screenWidth - 200)) - (screenWidth/2) + 100}px, ${screenHeight - mobileOffset}px)`;
                break;
            case 3: // from left
                letter.style.transform = `translate(${-screenWidth + mobileOffset}px, ${(Math.random() * (screenHeight - 200)) - (screenHeight/2) + 100}px)`;
                break;
        }
        
        nameText.appendChild(letter);
        
        // Faster animation timing - reduce delays significantly
        setTimeout(() => {
            letter.classList.add('animate');
            
            // Add bounce effect when letter reaches position
            setTimeout(() => {
                letter.classList.add('bounce');
                setTimeout(() => {
                    letter.classList.remove('bounce');
                }, 200); // Faster bounce
            }, isMobile ? 400 : 300); // Much faster reach time
            
        }, index * (isMobile ? 80 : 60)); // Much faster stagger between letters
    });
    
    // Add scroll listener much earlier - but only for the scroll animation, not navbar visibility
    setTimeout(() => {
        window.addEventListener('scroll', handleScrollAnimation);
    }, 500); // Add scroll listener after just 0.5 seconds
    
    let isNameInNav = false; // State to track the name's position
    let isNavbarVisibilityActive = false; // State to track if navbar visibility is active
    const nameContainer = document.querySelector('.name-container');
    const navLogo = document.getElementById('navLogo');

    // Function to animate the name to the navbar
    function animateNameToNav() {
        if (isNameInNav) return; // Already in nav, do nothing
        isNameInNav = true;
        const logoRect = navLogo.getBoundingClientRect();
        
        nameContainer.style.top = `${logoRect.top + (logoRect.height / 2)}px`;
        nameContainer.style.left = `${logoRect.left}px`;
        nameContainer.classList.add('in-nav');
        
        nameContainer.addEventListener('transitionend', () => {
            if (isNameInNav) { // Only hide if it's supposed to be in the nav
                nameContainer.style.opacity = '0';
                navLogo.classList.add('visible');
                
                // Activate navbar visibility functionality after name animation is complete
                if (!isNavbarVisibilityActive) {
                    isNavbarVisibilityActive = true;
                    window.addEventListener('scroll', handleNavbarVisibility);
                }
            }
        }, { once: true });
    }

    // Function to animate the name back to the center
    function animateNameBackToCenter() {
        if (!isNameInNav) return; // Already in center, do nothing
        isNameInNav = false;
        
        // Make animated name visible and hide the static logo
        navLogo.classList.remove('visible');
        nameContainer.style.opacity = '1';

        // Remove inline styles and class to trigger CSS transition back to center
        nameContainer.style.top = '';
        nameContainer.style.left = '';
        nameContainer.classList.remove('in-nav');
        
        // Reset navbar visibility flag when name goes back to center
        if (isNavbarVisibilityActive) {
            isNavbarVisibilityActive = false;
            window.removeEventListener('scroll', handleNavbarVisibility);
            // Ensure navbar is visible when back at top
            navbar.classList.remove('hidden');
        }
    }

    // Function to handle the scroll animation
    function handleScrollAnimation() {
        const scrollPosition = window.scrollY;

        // Animate to navbar on scroll down
        if (scrollPosition > 20) {
            animateNameToNav();
        } 
        // Animate back to center on scroll to top
        else if (scrollPosition <= 20) {
            animateNameBackToCenter();
        }
    }

    // Navbar visibility functionality
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function handleNavbarVisibility() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Don't hide navbar when at the very top
                if (scrollTop <= 100) {
                    navbar.classList.remove('hidden');
                }
                // Hide navbar when scrolling down
                else if (scrollTop > lastScrollTop && scrollTop > 150) {
                    navbar.classList.add('hidden');
                }
                // Show navbar when scrolling up
                else if (scrollTop < lastScrollTop) {
                    navbar.classList.remove('hidden');
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
                ticking = false;
            });
            ticking = true;
        }
    }

    // Burger menu functionality
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    burgerMenu.addEventListener('click', function() {
        const isActive = burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Show navbar when mobile menu is opened
        if (isActive) {
            navbar.classList.remove('hidden');
        }

        // If the menu is opened, move name to nav. If closed, move it back.
        // This only runs if the user hasn't scrolled down.
        if (window.scrollY <= 20) {
            if (isActive) {
                animateNameToNav();
            } else {
                animateNameBackToCenter();
            }
        }
    });
    
    // Enhanced smooth scroll functionality for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Close mobile menu if open
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            const targetId = link.getAttribute('href').substring(1); // Remove #
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                let offsetTop;
                
                // For home section, scroll to very top
                if (targetId === 'home') {
                    offsetTop = 0;
                } else {
                    // For other sections, account for navbar height
                    offsetTop = targetSection.offsetTop - 70;
                }
                
                // Smooth scroll animation
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Function to update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener for active nav link updates
    window.addEventListener('scroll', updateActiveNavLink);

    // Add click event listeners to nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Set initial active state
    updateActiveNavLink();
});