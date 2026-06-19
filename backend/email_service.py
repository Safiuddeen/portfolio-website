import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def send_contact_email(name: str, email: str, mobile: str, message: str):
    """Formats and sends an email via SMTP Port 587."""
    
    # Dynamically fetch these directly inside the function
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL")

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
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
        print(f"Attempting connection to {smtp_server}:{smtp_port} using {sender_email}...")
        
        # Connect using standard SMTP (Required for port 587)
        with smtplib.SMTP(smtp_server, smtp_port, timeout=15) as server:
            server.ehlo()          # Identify ourselves to the server
            server.starttls()      # Upgrade connection to secure TLS
            server.ehlo()          # Re-identify over secure connection
            
            server.login(sender_email, sender_password)
            server.send_message(msg)
            
        print("SUCCESS: Email sent perfectly!")
        return True
    except Exception as e:
        print(f"CRITICAL ERROR: Failed to send email: {e}")
        return False