import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../core/models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit{
  @Input({required: true}) buttonText = '';
  @Input() initialFormData: Category | null = null;
  @Output() onSubmit: EventEmitter<Category> = new EventEmitter<Category>();

  private fb: FormBuilder = inject(FormBuilder);

  categoryForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    if (this.initialFormData) {
      this.categoryForm = this.fb.group({
        id: [this.initialFormData.id],
        name: [this.initialFormData.name, Validators.required]
      });
    } else {
      this.categoryForm = this.fb.group({
        id: [0],
        name: ['', Validators.required]
      });
    }
  }

  onButtonPress(): void {
    const category: Category = this.categoryForm.value as Category;
    this.onSubmit.emit(category);
  }

}
