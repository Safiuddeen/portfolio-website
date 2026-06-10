import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
// Add this import (Make sure the path matches your folder structure)
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-contact',
  standalone: true,
  // Add Footer to the imports array here
  imports: [CommonModule, ReactiveFormsModule, Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;

  // State variables linked to your HTML for animations and alerts
  isSubmitting = false;
  successMessage = false;
  errorMessage = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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
    if (this.contactForm.invalid) {
      // If invalid, mark all fields as touched so the red error messages appear immediately
      this.contactForm.markAllAsTouched();
      return;
    }

    // Set loading state to true and clear any previous messages
    this.isSubmitting = true;
    this.successMessage = false;
    this.errorMessage = false;

    // Send the data to your Python FastAPI backend
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: (response) => {
        console.log('Server response:', response);

        // Stop the loading spinner and show the success message
        this.isSubmitting = false;
        this.successMessage = true;

        // Clear the form fields
        this.contactForm.reset();

        // Automatically hide the green success message after 5 seconds
        setTimeout(() => {
          this.successMessage = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Error sending message:', error);

        // Stop the loading spinner and show the red error message
        this.isSubmitting = false;
        this.errorMessage = true;
      }
    });
  }
}
