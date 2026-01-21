# Image Assets Guide

This folder contains all image assets for the portfolio website.

## Required Images

### 1. Profile Photo
- **Filename**: `profile.jpg`
- **Recommended Size**: 500x500px (square)
- **Format**: JPG or PNG
- **Purpose**: Hero section profile image
- **Tips**: 
  - Use a professional headshot
  - Ensure good lighting
  - Plain or blurred background works best
  - Compress the image to keep file size under 200KB

### 2. Project Screenshots
- **Filenames**: `project-1.jpg`, `project-2.jpg`, `project-3.jpg`
- **Recommended Size**: 1200x675px (16:9 ratio)
- **Format**: JPG or PNG
- **Purpose**: Project showcase cards
- **Tips**:
  - Capture full-page screenshots of your projects
  - Show the most interesting/impressive part
  - Compress images to keep under 300KB each
  - Consider using mockup templates for better presentation

### 3. Favicon
- **Filename**: `favicon.ico`
- **Recommended Size**: 32x32px or 16x16px
- **Format**: ICO
- **Purpose**: Browser tab icon
- **Tips**:
  - Use your initials (IT) or a simple logo
  - Keep it simple and recognizable
  - Free tool: https://favicon.io/

## Optional Images

### Preview/Thumbnail
- **Filename**: `preview.png`
- **Size**: 1200x630px
- **Purpose**: README preview and social media sharing
- **Description**: Screenshot of your homepage

## Image Optimization Tools

1. **TinyPNG** - https://tinypng.com/
   - Best for PNG/JPG compression
   - Free, no signup required

2. **Squoosh** - https://squoosh.app/
   - Advanced compression options
   - WebP conversion

3. **GIMP/Photoshop**
   - For advanced editing
   - Resize and crop

4. **Favicon Generator** - https://favicon.io/
   - Generate favicons from text or images

## Current Status

- [ ] profile.jpg - *Add your professional photo*
- [ ] project-1.jpg - *Add first project screenshot*
- [ ] project-2.jpg - *Add second project screenshot*
- [ ] project-3.jpg - *Add third project screenshot*
- [ ] favicon.ico - *Add your favicon*
- [ ] preview.png - *Add portfolio preview (optional)*

## Placeholder Behavior

Until you add these images, the portfolio will display:
- **Profile**: Icon placeholder with gradient background
- **Projects**: Icon placeholders with "image" icon
- **Favicon**: Browser default

## Adding Images - Quick Steps

1. Save your images to this folder
2. Name them exactly as specified above
3. Update `index.html` by uncommenting the image tags
4. Remove the placeholder divs
5. Test in browser

## Example HTML Update

**Before (with placeholder):**
```html
<div class="image-placeholder">
    <i class="fas fa-user-circle"></i>
</div>
```

**After (with your image):**
```html
<img src="images/profile.jpg" alt="Ibnul Tahsin Rihan">
```

---

*Need help? Check the main README.md for detailed customization instructions.*
