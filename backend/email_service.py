import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
# 🔽 Changed fallback default from 465 to 587
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")

def send_contact_email(name: str, email: str, mobile: str, message: str):
    """Formats and sends an email via SMTP."""
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    
    msg['Subject'] = f"Portfolio Inquiry: {name}"

    body = f"""Hello,

You have received a new message from your portfolio contact form.

--------------------------------------------------
CONTACT DETAILS
--------------------------------------------------
Name:   {name}
Email:  {email}
Mobile: {mobile}

--------------------------------------------------
MESSAGE
--------------------------------------------------
{message}

--------------------------------------------------
* This is an automated message from your portfolio website. *
"""
           
    msg.attach(MIMEText(body, 'plain'))

    try:
        # 🔽 CHANGED: Swapped SMTP_SSL for SMTP to properly initiate TLS on port 587
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # 🌟 CRUCIAL: Encrypts the connection securely
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False