import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss'],
})
export class AddPictureComponent implements OnInit {
  @Output() submitData = new EventEmitter<File[]>();
  @Output() skip = new EventEmitter<string>();
  @Input() presentFormData: any = {};
  photoForm!: FormGroup;
  photos: string[] = [];
  files: File[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.photoForm = this.fb.group({
      galleryFile: ['']
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const selectedFiles: File[] = Array.prototype.slice.call(event.target.files);
      selectedFiles.forEach((file: File) => {
        this.files.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.photos.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
    this.files.splice(index, 1);
  }

  submitForm() {
    if (this.files.length) {
      this.submitData.emit(this.files);
    }
  }

  skipStep() {
    this.skip.emit('photo');
  }
}
