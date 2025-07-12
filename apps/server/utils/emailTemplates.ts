export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head> … </head>
  <body style="font-family:…; background-color: #f2f2f2;">
    <div style="background: linear-gradient(135deg, #c62828 0%, #8e0000 100%); padding: 30px; text-align: center;">
      <div style="display: inline-flex; align-items: center; margin-bottom: 10px;">
        <div style="width: 40px; height: 40px; background: rgba(0,0,0,0.2); border-radius: 8px; margin-right: 12px;">
          <span style="color: white; font-size: 24px;">🧭</span>
        </div>
        <h1 style="color: white; font-size: 28px; margin: 0;">OpenSourceChandigarh</h1>
      </div>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px;">Verify Your Email Address</p>
    </div>

    <div style="background: white; padding: 40px; margin: 0;">
      <h2 style="color: #212121; font-size: 24px; margin-bottom: 20px;">Welcome to OpenSourceChandigarh!</h2>
      <p style="color: #555; font-size: 16px;">Thanks for joining. To activate your account, please verify your email.</p>
      <p style="color: #555; font-size: 16px; margin-bottom: 30px;">Your verification code:</p>

      <div style="text-align: center; margin: 40px 0;">
        <div style="background: #fff5f5; border: 2px solid #c62828; border-radius: 12px; padding: 20px; display: inline-block;">
          <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #c62828; font-family: 'Courier New', monospace;">{verificationCode}</span>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <a href="{VERIFICATION_LINK}" style="background: #c62828; color: white; padding: 14px 28px; border-radius: 8px; font-size: 16px; text-decoration: none;">
          Enter Verification Code
        </a>
      </div>

      <p style="color: #555; font-size: 16px;">Use this code on our verification page to complete registration.</p>

      <div style="background-color: #fff4e5; border-left: 4px solid #ff8a00; padding: 16px; margin: 30px 0; border-radius: 0 8px 8px 0;">
        <p style="color: #7a4a00; font-size: 14px;">⚠️ This code expires in 15 minutes for your security.</p>
      </div>

      <p style="color: #555; font-size: 14px; margin-top: 30px;">If you didn't sign up for OpenSourceChandigarh, simply ignore this email.</p>
    </div>

    <div style="background-color: #f2f2f2; padding: 30px; text-align: center; border-top: 1px solid #ddd;">
      <p style="color: #555; font-size: 14px;">Best regards,<br><strong>The OpenSourceChandigarh Team</strong></p>
      <p style="color: #888; font-size: 12px;">This is an automated message. Please do not reply.</p>
    </div>
  </body>
</html>

`;

export const WELCOME_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head> … </head>
<body style="font-family:…; background-color: #f2f2f2;">
  <div style="background: linear-gradient(135deg, #c62828 0%, #8e0000 100%); padding: 30px; text-align: center;">
    <div style="display: inline-flex; align-items: center;">
      <div style="width: 40px; height: 40px; background: rgba(0,0,0,0.2); border-radius: 8px; margin-right: 12px;">
        <span style="color: white; font-size: 24px;">🧭</span>
      </div>
      <h1 style="color: white; font-size: 28px;">OpenSourceChandigarh</h1>
    </div>
    <p style="color: rgba(255,255,255,0.9); font-size: 16px;">Glad you're here</p>
  </div>

  <div style="background: white; padding: 40px;">
    <h2 style="color: #212121; font-size: 24px;">🎉 Welcome on board!</h2>
    <p style="color: #555; font-size: 16px;">You're now part of the OpenSourceChandigarh community, connecting through collaborative open–source projects.</p>

    <div style="background:#fff5f5; border-radius:12px; padding:25px; margin:30px 0;">
      <h3 style="color:#c62828; font-size:18px;">Here's what you can do:</h3>
      <ul style="color:#555; font-size:15px; padding-left:20px;">
        <li>Explore open-source initiatives</li>
        <li>Join collaborative events and meetups</li>
        <li>Contribute code, docs, designs</li>
        <li>Engage with local OSS community</li>
      </ul>
    </div>

    <div style="text-align:center; margin:35px 0;">
      <a href="#" style="background:#c62828; color:white; padding:14px 28px; border-radius:8px; font-size:16px; text-decoration:none;">
        Start Exploring
      </a>
    </div>

    <p style="color:#555; font-size:16px;">We’re thrilled to have you with us. Let’s build great things together!</p>
  </div>

  <div style="background:#f2f2f2; padding:30px; text-align:center; border-top:1px solid #ddd;">
    <p style="color:#555; font-size:14px;">Best regards,<br><strong>The OpenSourceChandigarh Team</strong></p>
    <p style="color:#888; font-size:12px;">This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>

`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Successfully Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);">
            <td align="center" style="padding: 30px;">
              <img src="favicon.jpg" alt="Logo" width="50" style="border-radius: 6px; display:block; margin-bottom: 10px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">OpenSourceChandigarh</h1>
              <p style="color: #e0ffe1; font-size: 16px; margin: 5px 0 0;">Password Changed Successfully</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; font-size: 20px;">Your password has been updated</h2>
              <p style="font-size: 15px; color: #555555;">
                We're letting you know that your password has been changed successfully. If this was you, no further action is needed.
              </p>
              <p style="font-size: 15px; color: #555555;">
                If you did not perform this action, please contact our support team immediately.
              </p>
              <div style="margin: 30px 0;">
                <a href="https://opensourcechandigarh.dev" style="display:inline-block; background-color: #2e7d32; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Go to Website
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; font-size: 12px; color: #999999;">
              © 2025 OpenSourceChandigarh. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset Request</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr style="background: linear-gradient(135deg, #c62828 0%, #8e0000 100%);">
            <td align="center" style="padding: 30px;">
              <img src="favicon.jpg" alt="Logo" width="50" style="border-radius: 6px; display:block; margin-bottom: 10px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">OpenSourceChandigarh</h1>
              <p style="color: #ffeaea; font-size: 16px; margin: 5px 0 0;">Reset Your Password</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; font-size: 20px;">Password Reset Request</h2>
              <p style="font-size: 15px; color: #555555;">
                You requested to reset your password. Click the button below to set a new one.
              </p>
              <div style="margin: 30px 0;">
                <a href="{resetURL}" style="display:inline-block; background-color: #c62828; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              <div>
              OTP: {OTP}
              </div>
              <p style="font-size: 13px; color: #888888;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; font-size: 12px; color: #999999;">
              © 2025 OpenSourceChandigarh. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
