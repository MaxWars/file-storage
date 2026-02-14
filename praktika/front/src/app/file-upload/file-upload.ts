import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,    // для formGroup, formControlName
    MatDialogModule,        // для mat-dialog-content, mat-dialog-actions
    MatFormFieldModule,     // для mat-form-field
    MatInputModule,         // для mat-label, input
    MatButtonModule         // для кнопок
  ],
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.scss']
})
export class FileUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<FileUploadComponent>
  ) {
    this.uploadForm = this.fb.group({
      description: [''],
      theme: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('description', this.uploadForm.get('description')?.value || '');
    formData.append('theme', this.uploadForm.get('theme')?.value || '');

    this.api.uploadFile(formData).subscribe({
      next: () => {
        this.dialogRef.close(true); // сигнал об успехе
      },
      error: (err) => console.error('Upload error', err)
    });
  }
}
