let lastScrollTop = 0;

document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop && currentScroll > 30) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScrollTop) {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling

    const bannerTexts = document.querySelectorAll('.banner-text');
    let viewedElements = new Set();

    window.addEventListener('scroll', () => {
        bannerTexts.forEach(bannerText => {
            const rect = bannerText.getBoundingClientRect();
            const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

            if (isVisible) {
                if (!viewedElements.has(bannerText)) {
                    bannerText.classList.remove('hidden');
                    bannerText.classList.add('visible');
                    viewedElements.add(bannerText);
                }
            }
        });

    if (window.scrollY === 0) {
        viewedElements.clear();
        bannerTexts.forEach(bannerText => {
            bannerText.classList.remove('visible');
            bannerText.classList.add('hidden');
        });
    }
});

    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            setTimeout(() => {
                project.classList.add('animate');
            }, index * 100);
        } else {
            project.classList.remove('animate');
        }
    });

    const awards = document.querySelectorAll('.award');
    awards.forEach((award, index) => {
        const rect = award.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            setTimeout(() => {
                award.classList.add('animate');
            }, index * 300);
        } else {
            award.classList.remove('animate');
        }
    });

    const hackathons = document.querySelectorAll('.hackathon');
    hackathons.forEach((hackathon, index) => {
        const rect = hackathon.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            setTimeout(() => {
                hackathon.classList.add('animate');
            }, index * 300);
        } else {
            hackathon.classList.remove('animate');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.banner');
    const navLinks = document.querySelectorAll('.navbar a');

    function highlightNavLink() {
        let currentBanner = null;

        banners.forEach(banner => {
            const rect = banner.getBoundingClientRect();
            const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);
            if (isVisible) {
                currentBanner = banner;
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
        });

        if (currentBanner) {
            const bannerId = currentBanner.getAttribute('id');
            const activeLink = document.querySelector(`.navbar a[href="#${bannerId}"]`);
            if (activeLink) {
                activeLink.style.color = "hsl(200, 72%, 21%)";
            }
        }
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
});
