import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from "../../core/services/category.service";
import {Category} from "../../core/models/category";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);

  private toastr: ToastrService = inject(ToastrService);

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => this.categories = categories,
      error: (err) => this.toastr.error(err.statusText)
    })
  }

  delete(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => this.categories = this.categories.filter((c: Category) => c.id !== id),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
