// Main Page JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    // Load content
    await loadAboutContent();
    await loadContentSection();
    await loadLinks();

    // Setup mobile menu
    setupMobileMenu();

    // Set year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        nav.classList.toggle('active');
        btn.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            nav.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Load About Content
async function loadAboutContent() {
    try {
        const response = await fetch('content/about.json');
        const data = await response.json();

        document.getElementById('hero-name').textContent = data.name;
        document.getElementById('hero-tagline').textContent = data.tagline;
        document.getElementById('hero-bio').textContent = data.bio;

        // Load interests
        const interestList = document.getElementById('interest-list');
        interestList.innerHTML = '';
        data.interests.forEach(interest => {
            const li = document.createElement('li');
            li.textContent = interest;
            interestList.appendChild(li);
        });

    } catch (error) {
        console.error('Error loading about:', error);
    }
}

// Load Content Section
async function loadContentSection() {
    try {
        const response = await fetch('content/content.json');
        const data = await response.json();

        // Featured content
        const featured = document.getElementById('featured-content');
        featured.innerHTML = `
      <a href="${data.featured.url}" target="_blank" rel="noopener noreferrer" class="featured-card card">
        <div class="icon">${data.featured.icon}</div>
        <h3>${data.featured.title}</h3>
        <p>${data.featured.description}</p>
        <span class="btn">Read on Substack →</span>
      </a>
    `;

        // Upcoming platforms
        const upcoming = document.getElementById('upcoming-platforms');
        upcoming.innerHTML = '';
        data.upcoming.forEach(item => {
            const badge = document.createElement('div');
            badge.className = 'upcoming-badge';
            badge.innerHTML = `<span>${item.icon}</span> ${item.platform} — ${item.status}`;
            upcoming.appendChild(badge);
        });

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Load Links
async function loadLinks() {
    try {
        const response = await fetch('content/links.json');
        const links = await response.json();

        const container = document.getElementById('links-container');
        container.innerHTML = '';

        links.forEach(link => {
            const card = document.createElement('a');
            card.href = link.url;
            card.target = link.url.startsWith('mailto') ? '' : '_blank';
            card.rel = 'noopener noreferrer';
            card.className = 'link-card card';
            card.innerHTML = `
        <div class="icon">${link.icon}</div>
        <h3>${link.title}</h3>
        <p>${link.description}</p>
      `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading links:', error);
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
