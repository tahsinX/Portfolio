# Email Setup Guide - Direct Backend

Your contact form now uses a **direct backend server** to send emails. No third-party services!

## Setup Instructions

### Step 1: Install Node.js Dependencies

Run this command in your portfolio folder:

```bash
npm install
```

This installs: `express`, `nodemailer`, `cors`, `dotenv`

### Step 2: Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords**
4. Select "Mail" and "Windows Computer"
5. Copy the **16-digit password** generated

### Step 3: Configure `.env` File

Open `.env` in your portfolio folder and update:

```
EMAIL_USER=ibnultahsinrihan@gmail.com
EMAIL_PASSWORD=your_16_digit_app_password_here
PORT=3000
```

**Important:** Do NOT use your regular Gmail password! Use the 16-digit **App Password** only.

### Step 4: Run the Server

Open terminal in your portfolio folder and run:

```bash
npm start
```

You should see:
```
✅ Email server ready
🚀 Server running on http://localhost:3000
```

### Step 5: Test the Form

1. Open `http://localhost:3000` in your browser
2. Scroll to Contact section
3. Fill out and submit the form
4. Email will arrive in your inbox instantly!

## How It Works

```
User fills form → Frontend sends to backend → Backend sends direct email to Gmail
```

No middle services. Direct and fast! 💨

## Troubleshooting

**Port 3000 already in use?**
```bash
npm start -- --port 3001
```

**"Email server failed" error?**
- Check your Gmail App Password is correct (16 digits)
- Make sure 2-Step Verification is enabled on Gmail
- Check `.env` file has correct email address

**Can't connect to localhost:3000?**
- Make sure the server is running (`npm start`)
- Try `http://localhost:3000` in your browser

## Deployment

To deploy on a hosting service (Heroku, Railway, etc.):

1. Push to GitHub
2. Connect your repo to the hosting service
3. Add environment variables in their dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
4. Deploy!

## Security Note

Your `.env` file is listed in `.gitignore` (already created) so sensitive data won't be pushed to GitHub.

---

**Now you have a working email system! When deployed, visitors from anywhere can send you emails directly.** ✅
