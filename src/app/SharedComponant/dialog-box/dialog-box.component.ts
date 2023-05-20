import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent implements OnInit {
  formData: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formData = this.fb.group({
      name: '',
      type: '',
      children: this.fb.array([]),
    });

    // Add an initial child group
    this.addChild();
  }

  get children() {
    return this.formData.get('children') as FormArray;
  }

  addChild() {
    const childGroup = this.fb.group({
      type: '',
      id: '',
      name: '',
    });
    this.children.push(childGroup);
  }

  submitForm() {
    console.log(this.formData.value);
    this.dialogRef.close({ data: this.formData });
  }
  removeChild(index: number) {
    this.children.removeAt(index);
  }
  onNoClick(): void {}
}
