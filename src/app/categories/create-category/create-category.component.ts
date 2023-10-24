import {Component, inject} from '@angular/core';
import {CategoryService} from "../../core/services/category.service";
import {Router} from "@angular/router";
import {Category} from "../../core/models/category";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);

  private toastr: ToastrService = inject(ToastrService);

  create(category: Category): void {
    this.categoryService.create(category).subscribe({
      next: () => this.router.navigateByUrl('/categories'),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
