import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true, // Make sure standalone is true for modern Angular
  imports: [CommonModule, ReactiveFormsModule], // Required for form validation
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // 1. Define the form and its validation rules
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // 2. Function runs when the "Send Message" button is clicked
  onSubmit() {
    // Check if all fields are filled out correctly
    if (this.contactForm.valid) {
      const { name, email, mobile, message } = this.contactForm.value;

      // Construct the email data
      const mailTo = 'safiuddeen446@gmail.com';
      const subject = encodeURIComponent(`New Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\n\nMessage:\n${message}`
      );

      // Open the user's email client to send the message
      window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;

      // Clear the form after triggering the email
      this.contactForm.reset();

    } else {
      // If invalid, mark all fields as touched so the red error messages appear immediately in the HTML
      this.contactForm.markAllAsTouched();
    }
  }
}
