# Quick Start Guide

Get your portfolio running in 3 minutes!

## Step 1: Open the Portfolio (30 seconds)

### Option A: Direct Browser Open
1. Navigate to the portfolio folder
2. Double-click `index.html`
3. Your portfolio opens in your default browser ✅

### Option B: VS Code Live Server (Recommended)
1. Open the portfolio folder in VS Code
2. Install "Live Server" extension (if not installed)
3. Right-click on `index.html` → "Open with Live Server"
4. Portfolio opens at `http://localhost:5500` ✅

### Option C: Python Server
```bash
# Navigate to portfolio folder in terminal
cd "E:\UIU ELMS trimester 10\Portfolio for ITR"

# Start server (Python 3)
python -m http.server 8000

# Open browser to: http://localhost:8000
```

---

## Step 2: Customize Your Content (2 minutes)

### Essential Updates

#### 1. Update Contact Information
**File**: `index.html`

Find and replace:
- GitHub URL: `https://github.com/tahsinX`
- LinkedIn URL: `https://www.linkedin.com/in/ibnul-tahsin-rihan-875b45256/`
- Email: `Ibnultahsinrihan@gmail.com`

#### 2. Add Your Project Details
**File**: `index.html` (Lines 185-270)

Update each project card:
- Project title
- Project description
- Technology tags
- Live demo links
- GitHub repository links

#### 3. Customize About Section (Optional)
**File**: `index.html` (Lines 110-145)

Edit the about text to match your experience and goals.

---

## Step 3: Add Images (Optional but Recommended)

### Required Images
1. **Profile Photo**: `images/profile.jpg` (500x500px)
2. **Project Screenshots**: 
   - `images/project-1.jpg`
   - `images/project-2.jpg`
   - `images/project-3.jpg`
3. **Favicon**: `images/favicon.ico`

### After Adding Images
Update `index.html`:

**Profile Image** (around line 76):
```html
<!-- Remove this -->
<div class="image-placeholder">
    <i class="fas fa-user-circle"></i>
</div>

<!-- Add this -->
<img src="images/profile.jpg" alt="Ibnul Tahsin Rihan">
```

**Project Images** (in each project card):
```html
<!-- Remove this -->
<div class="image-placeholder">
    <i class="fas fa-image"></i>
</div>

<!-- Add this -->
<img src="images/project-1.jpg" alt="Project Name">
```

See `images/README.md` for detailed image instructions.

---

## ✨ You're Done!

Your portfolio is now live and personalized!

## Next Steps

### Immediate Actions
1. ✅ Test on mobile devices (use browser DevTools)
2. ✅ Check all links work correctly
3. ✅ Verify contact form validation
4. ✅ Test navigation and scroll behavior

### Short Term
- [ ] Add real project screenshots
- [ ] Write detailed project descriptions
- [ ] Add your professional photo
- [ ] Customize color scheme (if desired)

### Before Deployment
- [ ] Compress all images
- [ ] Update all placeholder links
- [ ] Test on multiple browsers
- [ ] Add Google Analytics (optional)
- [ ] Set up contact form backend

---

## Common Customizations

### Change Color Scheme
**File**: `css/style.css` (lines 4-15)

```css
:root {
    --primary-color: #3b82f6;     /* Change this */
    --primary-dark: #2563eb;      /* And this */
    --accent-color: #06b6d4;      /* And this */
}
```

Popular color schemes:
- **Purple**: `#8b5cf6` (primary), `#6d28d9` (dark), `#a78bfa` (accent)
- **Green**: `#10b981` (primary), `#059669` (dark), `#34d399` (accent)
- **Red**: `#ef4444` (primary), `#dc2626` (dark), `#f87171` (accent)

### Add/Remove Sections
Edit `index.html` and remove entire `<section>` blocks you don't need.

Don't forget to update navigation links in the navbar!

### Modify Skills
**File**: `index.html` (Skills section)

Update skill names and progress percentages:
```html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

---

## Deployment Ready?

### Deploy to GitHub Pages (Free)
1. Create GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select main branch
5. Live at: `https://yourusername.github.io/portfolio`

### Deploy to Netlify (Recommended)
1. Sign up at netlify.com
2. Drag & drop your folder
3. Live in seconds!
4. Free custom domain support

See `README.md` for detailed deployment instructions.

---

## Need Help?

### Documentation
- 📖 Full documentation: `README.md`
- 🎨 Image guide: `images/README.md`

### Common Issues

**Problem**: Portfolio looks broken
**Solution**: Make sure all CSS and JS files are in correct folders

**Problem**: Links don't work
**Solution**: Check that all `href` attributes are updated

**Problem**: Images don't show
**Solution**: Verify image filenames match exactly (case-sensitive)

**Problem**: Mobile menu doesn't work
**Solution**: Ensure `js/main.js` is loaded correctly

---

## File Checklist

```
✅ index.html - Main HTML file
✅ css/style.css - Styles
✅ js/main.js - JavaScript
✅ README.md - Documentation
⬜ images/profile.jpg - Your photo
⬜ images/project-*.jpg - Project screenshots
⬜ images/favicon.ico - Browser icon
```

---

**You're all set! 🚀**

*Build. Deploy. Get Hired.*

---

For questions or issues, check the main README.md or open an issue on GitHub.
