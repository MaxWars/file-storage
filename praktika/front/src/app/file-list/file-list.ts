import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api';
import { FileUploadComponent } from '../file-upload/file-upload';
import { FileDetailComponent } from '../file-detail/file-detail';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],

  templateUrl: './file-list.html',
  styleUrls: ['./file-list.scss']
})

export class FileList implements OnInit {
  displayedColumns: string[] = ['filename', 'size', 'upload_time', 'description', 'theme', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.api.getFiles().subscribe({
      next: (files) => this.dataSource.data = files,
      error: (err) => console.error('Error loading files', err)
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFiles();
      }
    });
  }
  downloadFile(file: any) {
    this.api.downloadFile(file.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => console.error('Download failed', err)
    });
  }
  openFileDetail(file: any) {
    const dialogRef = this.dialog.open(FileDetailComponent, {
      width: '500px',
      data: file
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        this.loadFiles();
      }
    });
  }

  deleteFile(file: any) {
    const confirmed = confirm(`Удалить файл "${file.filename}"?`);
    if (confirmed) {
      this.api.deleteFile(file.id).subscribe({
        next: () => this.loadFiles(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}


