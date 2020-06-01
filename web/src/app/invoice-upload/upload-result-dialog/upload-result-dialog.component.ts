import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-result-dialog',
  templateUrl: './upload-result-dialog.component.html',
  styleUrls: ['./upload-result-dialog.component.scss']
})
export class UploadResultDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public result: string) {
  }

}
