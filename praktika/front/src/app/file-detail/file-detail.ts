import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api'; // <-- добавьте импорт
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './file-detail.html',
  styleUrls: ['./file-detail.scss']
})
export class FileDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<FileDetailComponent>
  ) {}

}
