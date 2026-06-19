from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from email_service import send_contact_email

app = FastAPI()

# --- CORS Configuration ---
origins = [
    "https://inquisitive-jelly-261e36.netlify.app",
    "http://localhost:4200", 
    "http://127.0.0.1:4200",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# --- Pydantic Model ---
class ContactForm(BaseModel):
    name: str
    email: str
    mobile: str
    message: str

# --- API Route ---
@app.post("/api/contact")
def submit_contact(form_data: ContactForm):
    # Run the email sending directly (not in the background) to catch errors
    email_success = send_contact_email(
        form_data.name, 
        form_data.email, 
        form_data.mobile, 
        form_data.message
    )
    
    if email_success:
        return {"status": "success", "message": "Thank you! Your message has been sent."}
    else:
        raise HTTPException(status_code=500, detail="Backend failed to send email. Check Render logs.")