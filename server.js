/**
 * Backend Email Server
 * Express server to handle contact form submissions
 * Sends emails using Gmail + Nodemailer
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email server failed:', error.message);
        console.error('Check your .env file configuration');
    } else {
        console.log('✅ Email server ready');
    }
});

/**
 * POST /api/send-email
 * Handles contact form submissions
 */
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Email to send to you
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Message from Your Portfolio</h2>
                <p><strong>Name:</strong> ${sanitizeHTML(name)}</p>
                <p><strong>Email:</strong> ${sanitizeHTML(email)}</p>
                <p><strong>Subject:</strong> ${sanitizeHTML(subject)}</p>
                <hr>
                <h3>Message:</h3>
                <p>${sanitizeHTML(message).replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Reply to: ${sanitizeHTML(email)}</small></p>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log(`✉️  Email sent: ${info.response}`);

        // Send confirmation email to user
        const confirmationEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Message Received - Portfolio Contact Form',
            html: `
                <h2>Thank You for Reaching Out!</h2>
                <p>Hi ${sanitizeHTML(name)},</p>
                <p>I received your message and will get back to you as soon as possible.</p>
                <hr>
                <h3>Your Message Summary:</h3>
                <p><strong>Subject:</strong> ${sanitizeHTML(subject)}</p>
                <p><strong>Message:</strong></p>
                <p>${sanitizeHTML(message).replace(/\n/g, '<br>')}</p>
                <hr>
                <p>Best regards,<br>Ibnul Tahsin Rihan</p>
            `
        };

        await transporter.sendMail(confirmationEmail);
        console.log(`📧 Confirmation email sent to: ${email}`);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully! Check your inbox for confirmation.'
        });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email. Please try again later.'
        });
    }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running ✅' });
});

/**
 * Catch-all for serving index.html (SPA support)
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Sanitize HTML to prevent XSS
 */
function sanitizeHTML(str) {
    const htmlEscapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, char => htmlEscapeMap[char]);
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email service connected to: ${process.env.EMAIL_USER}`);
});
