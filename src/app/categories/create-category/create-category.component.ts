import {Component, inject} from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {Router} from "@angular/router";
import {Category} from "../../_models/category";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);

  create(category: Category) {
    this.categoryService.create(category).subscribe({
      next: () => this.router.navigateByUrl('/categories'),
      error: (err) => console.log(err)
    });
  }
}
