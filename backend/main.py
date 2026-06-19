from fastapi import FastAPI, BackgroundTasks
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
# Updated to include the mobile field from your HTML
class ContactForm(BaseModel):
    name: str
    email: str
    mobile: str
    message: str

# --- API Route ---
@app.post("/api/contact")
async def submit_contact(form_data: ContactForm, background_tasks: BackgroundTasks):
    background_tasks.add_task(
        send_contact_email, 
        form_data.name, 
        form_data.email, 
        form_data.mobile, # Passing the mobile number to the email service
        form_data.message
    )
    
    return {"status": "success", "message": "Thank you! Your message has been sent."}