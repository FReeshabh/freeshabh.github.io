# 🍊 Personal Website - Orange Theme

A beautiful, modern personal website built with pure HTML, CSS, and JavaScript. Features an eye-catching orange theme, smooth animations, and easy content management through JSON files.

## ✨ Features

- 🎨 **Stunning Orange Theme** - Vibrant gradients, glassmorphism effects, and modern design
- 📱 **Fully Responsive** - Looks great on all devices
- ✍️ **Blog/Writing Section** - Easy-to-update posts via JSON
- 📄 **Resume Display** - Professional experience and skills showcase
- 🔗 **Links & Projects** - Showcase your work and social profiles
- ⚡ **Fast & Lightweight** - No build process, pure static files
- 🎭 **Smooth Animations** - Micro-interactions and scroll animations
- 🚀 **Easy Deployment** - Works with GitHub Pages, Netlify, Vercel, and more

## 🚀 Quick Start

### Local Development

1. **Clone or download this repository**

2. **Serve the website locally** (choose one method):

   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have npx)
   npx serve
   ```

3. **Open in browser**: `http://localhost:8000`

## ✏️ Customizing Your Content

All content is stored in the `/content` directory as simple JSON files. Just edit these files to update your website!

### 1. Personal Information (`content/about.json`)

```json
{
  "name": "Your Name",
  "tagline": "Your Title or Tagline",
  "bio": "Your bio text...",
  "profileImage": "assets/images/profile.jpg",
  "social": {
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "mailto:your.email@example.com"
  }
}
```

### 2. Resume (`content/resume.json`)

Add your experience, education, and skills:

```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "2020 - Present",
      "description": "What you did..."
    }
  ],
  "education": [...],
  "skills": ["Skill 1", "Skill 2", ...]
}
```

### 3. Blog Posts (`content/posts/index.json`)

Add new posts to the array:

```json
[
  {
    "title": "Post Title",
    "date": "2026-02-01",
    "excerpt": "Brief description...",
    "tags": ["tag1", "tag2"],
    "url": "https://link-to-full-post.com"
  }
]
```

### 4. Links & Projects (`content/links.json`)

Showcase your work and links:

```json
[
  {
    "title": "Project Name",
    "icon": "🚀",
    "description": "Project description...",
    "url": "https://project-url.com"
  }
]
```

### 5. Profile Image

- Place your profile image in `assets/images/`
- Update `profileImage` path in `content/about.json`
- Or leave it empty to show your initial instead

## 🌐 Deploying to GitHub Pages

1. **Create a new GitHub repository**

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from branch `main` → `/` (root)
   - Save

4. **Access your site**: `https://yourusername.github.io/your-repo/`

### Custom Domain (Optional)

1. Buy a domain from any registrar
2. Add a `CNAME` file with your domain: `echo "yourdomain.com" > CNAME`
3. Configure your domain's DNS settings (add A records or CNAME)
4. Update custom domain in GitHub Pages settings

## 📁 Project Structure

```
personal-website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and design system
├── js/
│   └── main.js            # Content loading and interactions
├── content/
│   ├── about.json         # Personal info
│   ├── resume.json        # Experience, education, skills
│   ├── links.json         # Projects and links
│   └── posts/
│       └── index.json     # Blog posts
└── assets/
    └── images/            # Profile pic and other images
```

## 🎨 Customizing the Design

The entire color scheme and design system is defined in CSS custom properties at the top of `css/style.css`. You can easily customize:

- **Colors**: Change the orange theme to any color
- **Typography**: Update font families
- **Spacing**: Adjust spacing scale
- **Animations**: Modify transition speeds

Example - changing to a blue theme:
```css
--primary-orange: hsl(210, 95%, 55%);  /* Change hue to blue */
--deep-orange: hsl(215, 90%, 48%);
--light-orange: hsl(205, 100%, 70%);
```

## 🔄 Updating Your Website

1. Edit the relevant JSON file in `/content/`
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. GitHub Pages automatically updates (may take 1-2 minutes)

## 📝 License

Feel free to use this template for your personal website. No attribution required, but appreciated! 🙏

## 💡 Tips

- **Add new blog posts**: Just add entries to `content/posts/index.json`
- **Update resume**: Edit `content/resume.json` anytime
- **Change colors**: Modify CSS variables in `style.css`
- **Add images**: Place in `assets/images/` and reference in JSON files

---

Built with ❤️ and ☕ • No frameworks, just beautiful code
