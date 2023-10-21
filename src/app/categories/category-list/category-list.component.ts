import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {Category} from "../../_models/category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);

  categories: Category[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => this.categories = categories,
      error: (err) => console.log(err)
    })
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => this.categories = this.categories.filter((c: Category) => c.id !== id),
      error: (err) => console.log(err)
    });
  }
}
