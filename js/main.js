/**
 * Rishabh Tewari - Personal Website
 * Main JavaScript - Interactions, Dark Mode, Animations
 */

(function () {
  'use strict';

  // ============================================
  // DARK MODE - Auto switch at 6pm PST
  // ============================================
  const ThemeManager = {
    init() {
      this.html = document.documentElement;
      this.toggle = document.getElementById('theme-toggle');
      this.icon = this.toggle?.querySelector('.theme-toggle-icon');
      
      // Check stored preference or auto-detect
      const stored = localStorage.getItem('theme');
      if (stored) {
        this.setTheme(stored);
      } else {
        this.autoDetect();
      }
      
      // Listen for toggle clicks
      this.toggle?.addEventListener('click', () => this.toggleTheme());
      
      // Check time every minute for auto-switch
      setInterval(() => this.autoDetect(), 60000);
    },
    
    autoDetect() {
      // Only auto-switch if user hasn't set preference
      if (localStorage.getItem('theme')) return;
      
      // Get current time in PST
      const now = new Date();
      const pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
      const hour = pst.getHours();
      
      // Dark mode from 6pm (18:00) to 6am (06:00)
      const shouldBeDark = hour >= 18 || hour < 6;
      this.setTheme(shouldBeDark ? 'dark' : 'light', false);
    },
    
    setTheme(theme, store = true) {
      this.html.setAttribute('data-theme', theme);
      if (this.icon) {
        this.icon.textContent = theme === 'dark' ? '🌙' : '☀️';
      }
      if (store) {
        localStorage.setItem('theme', theme);
      }
    },
    
    toggleTheme() {
      const current = this.html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
    }
  };

  // ============================================
  // NAVIGATION
  // ============================================
  const Navigation = {
    init() {
      this.nav = document.getElementById('nav');
      this.menuBtn = document.getElementById('nav-menu-btn');
      this.navLinks = document.getElementById('nav-links');
      
      // Scroll behavior
      window.addEventListener('scroll', () => this.onScroll());
      
      // Mobile menu toggle
      this.menuBtn?.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking a link
      this.navLinks?.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
    },
    
    onScroll() {
      if (window.scrollY > 50) {
        this.nav?.classList.add('scrolled');
      } else {
        this.nav?.classList.remove('scrolled');
      }
    },
    
    toggleMenu() {
      this.navLinks?.classList.toggle('active');
      this.menuBtn?.classList.toggle('active');
    },
    
    closeMenu() {
      this.navLinks?.classList.remove('active');
      this.menuBtn?.classList.remove('active');
    }
  };

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const ScrollAnimations = {
    init() {
      this.elements = document.querySelectorAll('.animate-on-scroll');
      
      // Create Intersection Observer
      const options = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation
            this.observer.unobserve(entry.target);
          }
        });
      }, options);
      
      // Observe all elements
      this.elements.forEach(el => this.observer.observe(el));
    }
  };

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;
          
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const navHeight = document.getElementById('nav')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // ============================================
  // BLOG PREVIEW LOADER
  // ============================================
  const BlogPreview = {
    async init() {
      const container = document.getElementById('blog-preview');
      if (!container) return;
      
      try {
        const response = await fetch('/blog/posts.json');
        if (!response.ok) return; // No posts yet
        
        const posts = await response.json();
        if (posts.length === 0) return;
        
        // Show up to 3 recent posts
        const recentPosts = posts.slice(0, 3);
        
        container.innerHTML = recentPosts.map(post => `
          <a href="/blog/post.html?slug=${post.slug}" class="card blog-card animate-on-scroll">
            <div class="blog-card-date">${this.formatDate(post.date)}</div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
          </a>
        `).join('');
        
        // Re-init scroll animations for new elements
        ScrollAnimations.init();
        
      } catch (e) {
        // Silently fail - posts.json might not exist yet
        console.log('No blog posts found yet');
      }
    },
    
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  // ============================================
  // CONTACT FORM HANDLER
  // ============================================
  const ContactForm = {
    init() {
      const form = document.querySelector('.contact-form');
      if (!form) return;
      
      // Check if form has a valid action (not placeholder)
      const action = form.getAttribute('action');
      if (action.includes('your-form-id')) {
        // No formspree configured - use mailto fallback
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = form.querySelector('#name').value;
          const email = form.querySelector('#email').value;
          const message = form.querySelector('#message').value;
          
          const subject = encodeURIComponent(`Message from ${name}`);
          const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
          
          window.location.href = `mailto:tewaririshabh1@gmail.com?subject=${subject}&body=${body}`;
        });
      }
    }
  };

  // ============================================
  // INITIALIZE EVERYTHING
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    Navigation.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    BlogPreview.init();
    ContactForm.init();
  });

})();
