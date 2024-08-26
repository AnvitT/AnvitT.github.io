let lastScrollTop = 0;
let scrollHandler = function () {
    const navbar = document.querySelector('.navbar');
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop && currentScroll > 30) {
        document.querySelector(".dropdown-content").classList.remove("show");
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScrollTop) {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
};
document.addEventListener('scroll', scrollHandler);

document.addEventListener('scroll', function () {
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            setTimeout(() => {
                project.classList.add('animate');
            }, index * 150);
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
            }, index * 150);
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
            }, index * 150);
        } else {
            hackathon.classList.remove('animate');
        }
    });
});

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

document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.banner');
    const navLinks = document.querySelectorAll('.navbar a');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');

    function highlightNavLink() {
        let currentBanner = null;

        banners.forEach((banner, index) => {
            const rect = banner.getBoundingClientRect();
            const nextBanner = banners[index + 1];
            const nextRect = nextBanner ? nextBanner.getBoundingClientRect() : null;

            const isVisible = (rect.top <= window.innerHeight / 2) && (!nextRect || nextRect.top > window.innerHeight / 2);
            if (isVisible) {
                currentBanner = banner;
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
        });

        dropdownLinks.forEach(link => {
            link.style.color = '';
        });

        if (currentBanner) {
            const bannerId = currentBanner.getAttribute('id');
            const activeLink = document.querySelector(`.anchor a[href="#${bannerId}"]`);
            if (activeLink) {
                activeLink.style.color = "hsla(200, 72%, 21%, 1)";
                activeLink.style.fontSize = "1.2rem";

            }
            const dropdownLink = document.querySelector(`.dropdown-content a[href="#${bannerId}"]`);
            if (dropdownLink) {
                dropdownLink.style.color = "hsla(200, 72%, 21%, 1)";
                dropdownLink.style.fontSize = "1.2rem";
            }
        }
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
});

function toggleDropdown() {
    document.querySelector(".dropdown-content").classList.toggle("show");
}

document.querySelectorAll(".dropdown-content a").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".dropdown-content").classList.remove("show");
    });
});

document.addEventListener('click', (event) => {
    const dropdown = document.querySelector(".dropdown-content");
    const dropdownBtn = document.querySelector(".dropdown-btn");
    if (!dropdown.contains(event.target) && !dropdownBtn.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

function disableScrollHandler() {
    document.removeEventListener('scroll', scrollHandler);
    setTimeout(() => {
        document.addEventListener('scroll', scrollHandler);
    }, 1000);
}

document.querySelector('.navbar').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        disableScrollHandler();
        const navbar = document.querySelector('.navbar');
        navbar.classList.add('hidden');
    }
});

function createFavicon() {
    const newColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        newColorScheme = event.matches ? "dark" : "light";
    });
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    context.fillStyle = 'transparent';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '24px "Baskerville SC"';
    if (newColorScheme === "dark") {
        context.fillStyle = '#FFFFFF';
    } else {
        context.fillStyle = '#000000';
    }
    
    // const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // if (darkModeMediaQuery.matches) {
    //     context.fillStyle = '#FFFFFF';
    // } else {
    //     context.fillStyle = '#000000';
    // }  
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('AT', canvas.width / 2, canvas.height / 2);

    const favicon = document.getElementById('favicon');
    favicon.href = canvas.toDataURL('image/png');
}

window.onload = createFavicon;
