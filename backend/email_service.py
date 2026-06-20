import os
import requests  # Using web requests completely bypasses Render's SMTP block
from dotenv import load_dotenv

load_dotenv()

def send_contact_email(name: str, email: str, mobile: str, message: str):
    """Sends an email via Resend's Web HTTP API to bypass hosting blocks."""
    
    api_key = os.getenv("RESEND_API_KEY")
    # Resend free tier requires sending 'from' their default testing domain
    sender = "Portfolio Form <onboarding@resend.dev>"
    # This is where you want to RECEIVE your portfolio notifications
    receiver = "safideen.007@gmail.com" 

    if not api_key:
        print("CRITICAL ERROR: RESEND_API_KEY is missing from environment variables!")
        return False

    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    body = f"""New Message from Portfolio:

Name: {name}
Email: {email}
Mobile: {mobile}

Message:
{message}
"""

    payload = {
        "from": sender,
        "to": [receiver],
        "subject": f"Portfolio Inquiry: {name}",
        "text": body
    }

    try:
        print("Attempting to send email via Resend HTTP API...")
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        
        if response.status_code in [200, 201]:
            print("SUCCESS: Email sent perfectly via Resend!")
            return True
        else:
            print(f"CRITICAL ERROR: Resend API returned status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"CRITICAL ERROR: Failed to reach Resend API: {e}")
        return False