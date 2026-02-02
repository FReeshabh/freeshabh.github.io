// Portfolio Page JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    // Load content
    await loadPortfolioContent();

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

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// Load Portfolio Content
async function loadPortfolioContent() {
    try {
        const response = await fetch('content/resume.json');
        const data = await response.json();

        // Resume link
        document.getElementById('resume-link').href = data.resumeLink;

        // Patent
        const patentCard = document.getElementById('patent-card');
        patentCard.innerHTML = `
      <h3>📜 Published Patent</h3>
      <p><strong>${data.patent.title}</strong></p>
      <p>${data.patent.description}</p>
      <a href="${data.patent.url}" target="_blank" rel="noopener noreferrer" class="btn" style="margin-top: 1rem;">
        View Patent →
      </a>
    `;

        // Experience Timeline
        const expContainer = document.getElementById('experience-container');
        expContainer.innerHTML = '';

        data.experience.forEach(exp => {
            const item = document.createElement('article');
            item.className = 'timeline-item';
            item.innerHTML = `
        <h3>${exp.title}</h3>
        <div class="timeline-meta">
          <span class="timeline-company">${exp.company}</span>
          <span class="timeline-period">${exp.period}</span>
          <span class="timeline-location">${exp.location}</span>
        </div>
        <p>${exp.description}</p>
        ${exp.skills ? `
          <div class="timeline-skills">
            ${exp.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        ` : ''}
      `;
            expContainer.appendChild(item);
        });

        // Education
        const eduContainer = document.getElementById('education-container');
        eduContainer.innerHTML = '';

        data.education.forEach(edu => {
            const item = document.createElement('article');
            item.className = 'education-item';
            item.innerHTML = `
        <h3>${edu.degree}</h3>
        <p class="education-meta">${edu.institution} • ${edu.year}</p>
        ${edu.description ? `<p>${edu.description}</p>` : ''}
      `;
            eduContainer.appendChild(item);
        });

    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
}
