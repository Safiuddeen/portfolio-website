import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = false;
  errorMessage = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    // Initialize the form with all the fields from your HTML
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    // Stop if the form is invalid and highlight the errors
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Set loading state and clear previous messages
    this.isSubmitting = true;
    this.successMessage = false;
    this.errorMessage = false;

    // Send the data using the service
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        this.isSubmitting = false;
        this.successMessage = true;
        this.contactForm.reset(); // Clear the form fields

        // Automatically hide the success message after 5 seconds
        setTimeout(() => {
          this.successMessage = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.isSubmitting = false;
        this.errorMessage = true;
      }
    });
  }
}
