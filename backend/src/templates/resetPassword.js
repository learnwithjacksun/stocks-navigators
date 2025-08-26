export const resetPasswordTemplate = (name, url) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .logo {
                width: fit-content;
                height: 50px;
                margin: 0 auto;
                margin-bottom: 20px;
            }
            .header {
                background: #13a870;
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            .greeting {
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
            }
            .otp-container {
                background-color: #f8f9fa;
                border: 2px dashed #13a870;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
            }
            .otp-code {
                font-size: 32px;
                font-weight: bold;
                color: #13a870;
                letter-spacing: 8px;
                margin: 10px 0;
            }
            .instructions {
                color: #666;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                color: #856404;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .expiry {
                color: #dc3545;
                font-weight: 600;
            }
            .otp-btn {
                background-color: #13a870;
                color: white;
                border: none;
                padding: 20px 40px;
                font-size: 18px;
                border-radius: 5px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Reset Password</h1>
            </div>
            <div class="content">
                <div class="greeting">
                    Hello ${name || "there"}! 👋
                </div>
                <p class="instructions">
                    Thank you for requesting a password reset. To complete your password reset, please click the button below:
                </p>
                
                <div class="otp-code">
                    <a href="${url}" target="_blank">
                    <button class="otp-btn">Reset Password</button>
                    </a>
                </div>
                
                <div class="warning">
                    <strong>⚠️ Important:</strong> This link will expire in 10 minutes. Please click it immediately to reset your password.
                </div>
                
                <p class="instructions">
                    If you didn't request this password reset, please ignore this email or contact our support team.
                </p>
            </div>
            <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, contact our support team.</p>
                <p class="expiry">Link expires in: 10 minutes</p>
            </div>
        </div>
    </body>
    </html>
    
    `;
};
