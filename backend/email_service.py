import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")

def send_contact_email(name: str, email: str, mobile: str, message: str):
    """Formats and sends an email via SMTP."""
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    
    # Adding the sender's name to the subject line makes it easy to spot
    msg['Subject'] = f"Portfolio Inquiry: {name}"

    # A clean, professional, and easy-to-read text layout
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
           
    # Using 'plain' text for a standard, professional email look
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the server securely and send
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False