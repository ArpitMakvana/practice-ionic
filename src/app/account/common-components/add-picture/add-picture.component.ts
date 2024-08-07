import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss'],
})
export class AddPictureComponent implements OnInit {
  @Output() submitData = new EventEmitter<File>();
  @Output() skip = new EventEmitter<string>();
  @Input() presentFormData: any = {};
  photoForm!: FormGroup;
  photo: string | null = null;
  file: File | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.photoForm = this.fb.group({
      galleryFile: ['']
    });

    if (this.presentFormData?.photo) {
      this.photo = this.presentFormData.photo;
      this.file = this.presentFormData.file;
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file: File = event.target.files[0];
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.photo = null;
    this.file = null;
  }

  submitForm() {
    if (this.file) {
      this.submitData.emit(this.file);
    }
  }

  skipStep() {
    this.skip.emit('photo');
  }
}
