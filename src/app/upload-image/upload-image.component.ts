import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  imageURL: string;

  constructor() {
  }

  ngOnInit(): void { }


  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.imageURL = reader.result as string;

    }
    
  }

 }
