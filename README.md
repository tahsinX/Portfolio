# Ibnul Tahsin Rihan - Portfolio Website

A modern, professional, and fully responsive portfolio website showcasing my skills, projects, and experience as a Frontend Web Developer and aspiring MERN Stack Developer.

![Portfolio Preview](images/preview.png)

## 🚀 Live Demo

[View Live Portfolio](#) _(Replace with your deployed URL)_

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Contact](#contact)

## 🎯 About

This portfolio website is designed to present my professional profile, technical skills, academic background, and project work to potential employers and collaborators. It emphasizes clean code, semantic HTML, responsive design, and user experience.

**Key Highlights:**
- Mobile-first responsive design
- Smooth scrolling and scroll-based animations
- Interactive navigation with active section highlighting
- Functional contact form with validation
- SEO-optimized structure
- Performance-focused implementation

## ✨ Features

### Design & UX
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, professional design with subtle animations
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Elements**: Hover effects and scroll-triggered animations
- **Back to Top Button**: Quick navigation to the top of the page

### Sections
- **Hero Section**: Eye-catching introduction with CTA buttons
- **About**: Personal background and career objective
- **Skills**: Visual representation of technical competencies with progress bars
- **Projects**: Showcase of frontend implementation work
- **Education**: Academic timeline with extracurricular activities
- **Contact**: Functional form with validation and contact information

### Technical Features
- **Semantic HTML5**: Proper document structure and accessibility
- **CSS Custom Properties**: Maintainable and theme-ready styling
- **Vanilla JavaScript**: No dependencies, fast loading
- **Form Validation**: Client-side validation with user feedback
- **Lazy Loading**: Performance optimization for images
- **Cross-browser Compatible**: Works on all modern browsers

## 🛠️ Technologies Used

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality

### Design Tools
- **Google Fonts**: Inter & Poppins font families
- **Font Awesome**: Icon library for UI elements

### Development Tools
- **VS Code**: Primary code editor
- **Git & GitHub**: Version control and collaboration

### Future Enhancements (Planned)
- **React.js**: Migrating to React for enhanced interactivity
- **Node.js/Express**: Backend for contact form functionality
- **MongoDB**: Database for storing messages

## 🚦 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git (optional, for cloning)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tahsinX/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **View the portfolio**
   - Open `http://localhost:8000` in your browser

### Quick Setup with VS Code
1. Open the project folder in VS Code
2. Install "Live Server" extension
3. Right-click on `index.html` → "Open with Live Server"

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet with all styles
├── js/
│   └── main.js            # JavaScript functionality
├── images/                # Image assets
│   ├── profile.jpg       # Your profile photo (add this)
│   ├── project-1.jpg     # Project screenshots (add these)
│   ├── project-2.jpg
│   ├── project-3.jpg
│   └── favicon.ico       # Browser tab icon (add this)
├── asset/                 # Additional assets (if needed)
└── README.md             # Project documentation
```

## 🎨 Customization Guide

### 1. Personal Information

**Edit `index.html`:**
- Update meta tags (lines 5-10) with your information
- Replace social media links (search for `href="https://github.com/tahsinX"`)
- Update email address (`Ibnultahsinrihan@gmail.com`)

### 2. Profile Photo

**Add your photo:**
1. Place your photo in the `images/` folder (name it `profile.jpg`)
2. In `index.html`, find the `.image-placeholder` section (around line 76)
3. Uncomment and update:
   ```html
   <img src="images/profile.jpg" alt="Ibnul Tahsin Rihan">
   ```

### 3. Projects

**Add project screenshots:**
1. Add project images to `images/` folder
2. Update project cards in `index.html` (Projects section)
3. Replace placeholder divs with:
   ```html
   <img src="images/project-1.jpg" alt="Project Name">
   ```
4. Update project descriptions, titles, and links

### 4. Color Scheme

**Edit `css/style.css` (lines 4-15):**
```css
:root {
    --primary-color: #3b82f6;     /* Main brand color */
    --primary-dark: #2563eb;      /* Darker shade */
    --primary-light: #60a5fa;     /* Lighter shade */
    --secondary-color: #8b5cf6;   /* Secondary color */
    --accent-color: #06b6d4;      /* Accent color */
}
```

### 5. Contact Form Backend

The contact form currently uses client-side validation only. To make it functional:

**Option 1: Using FormSpree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Using EmailJS**
- Sign up at [EmailJS](https://www.emailjs.com/)
- Add EmailJS SDK to your project
- Update the form submission in `js/main.js`

**Option 3: Build your own backend**
- Create a Node.js/Express server
- Set up email service (Nodemailer)
- Update form submission endpoint

### 6. Favicon

Add a favicon for browser tab:
1. Create or download a favicon.ico file
2. Place it in the `images/` folder
3. The HTML already links to it (line 20)

## 🌐 Deployment

### GitHub Pages (Free)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (main) and root folder
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Recommended)
1. Create account at [Netlify](https://www.netlify.com/)
2. Connect your GitHub repository
3. Deploy with one click
4. Automatic deployments on every push

### Vercel
1. Create account at [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Deploy instantly

### Traditional Web Hosting
1. Upload all files via FTP to your hosting provider
2. Ensure `index.html` is in the root directory
3. Your site will be accessible at your domain

## 🌍 Browser Support

This portfolio is compatible with:

| Browser | Version |
|---------|---------|
| Chrome  | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari  | Latest 2 versions |
| Edge    | Latest 2 versions |
| Opera   | Latest 2 versions |

**Note**: Internet Explorer is not supported.

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1200px
- **Large Desktop**: > 1200px

## ⚡ Performance Tips

1. **Optimize Images**: 
   - Compress images before uploading
   - Use WebP format for better compression
   - Recommended tools: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

2. **Minify CSS & JS** (for production):
   ```bash
   # Using online tools or build tools
   # CSS Minifier: https://cssminifier.com/
   # JS Minifier: https://javascript-minifier.com/
   ```

3. **Enable Caching**: Configure your hosting to cache static assets

4. **Use CDN**: Consider using a CDN for Font Awesome and Google Fonts

## 🔒 Security Considerations

- All external links use `rel="noopener noreferrer"`
- Form validation prevents malicious input
- No inline JavaScript (separation of concerns)
- HTTPS recommended for deployment

## 🐛 Known Issues

- Contact form requires backend integration to actually send emails
- Placeholder images need to be replaced with actual screenshots

## 🎯 Future Improvements

- [ ] Add dark mode toggle
- [ ] Implement blog section
- [ ] Add project filtering by technology
- [ ] Create downloadable resume button
- [ ] Add testimonials section
- [ ] Integrate Google Analytics
- [ ] Add language switcher (English/Bangla)
- [ ] Migrate to React.js
- [ ] Add backend for contact form
- [ ] Implement CMS for easy content updates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Ibnul Tahsin Rihan**

- **Email**: [Ibnultahsinrihan@gmail.com](mailto:Ibnultahsinrihan@gmail.com)
- **GitHub**: [@tahsinX](https://github.com/tahsinX)
- **LinkedIn**: [Ibnul Tahsin Rihan](https://www.linkedin.com/in/ibnul-tahsin-rihan-875b45256/)

---

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from various portfolio designs in the developer community

---

**Built with ❤️ using HTML, CSS & JavaScript**

*Last Updated: January 2026*
