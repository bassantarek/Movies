import { Component, OnInit } from '@angular/core';
import { CategoryModel } from './categories.model';
import { MoviesService } from 'src/app/shared/movies.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/shared/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryName !: string;
  formValue !: FormGroup;
  categoryModelObj: CategoryModel = new CategoryModel();
  categoryData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  categoryNameFilter: string = "";
  // movieDataWithoutFilter !: any;
  categoryDataWithoutFilter: any = [];
  category: string = '';
  constructor(private formbuilder: FormBuilder, private api: CategoryService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      id: ['']
    });

    this.getAllCategory();
  }

  clickAddCategory() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  /* POST MOVIE */
  postCategoryDetails() {
    //this.categoryModelObj.categoryName = this.formValue.value.category;

    this.api.postCategory(this.formValue.value)
      .subscribe(res => {
        console.log(res);
        alert("Movie is added successfully ^_^");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllCategory();
      }, err => {
        alert("Something went wrong XX ")
        console.log(err);

      });
  }

  /* GET MOVIE */
  getAllCategory() {
    this.api.getCategory()
      .subscribe(res => {
        this.categoryData = res;
      });
  }

  /* DELETE MOVIE */
  deleteCategory(row: any) {
    this.api.deleteCategory(row.id)
      .subscribe(res => {
        alert("Movie Deleted");
        this.getAllCategory();
      });
  }

  /* UPDATE MOVIE */
  onEdit(row: CategoryModel) {
    this.showAdd = false;
    this.showUpdate = true;
    // this.categoryModelObj.id = row.id;
    this.formValue.controls['id'].setValue(row.id);
    //this.formValue.controls['name'].setValue(row.categoryName);
    this.formValue.get('name')?.setValue(row.categoryName);
  }

  updateCategoryDetails() {
    // this.categoryModelObj.categoryName = this.formValue.value.category;
    this.api.updateCategory(this.formValue.value)
      .subscribe(res => {
        alert("Updated Successfully ^_^");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllCategory();
      });
  }

  /* SEARCH */
  // FilterFn() {
  //   console.log(this.movieDataWithoutFilter);
  //   let movieNameFilter = this.movieNameFilter;
  //   this.categoryData = this.movieDataWithoutFilter.filter(function (el: any) {
  //     return el.movieName.toString().toLowerCase().includes(
  //       movieNameFilter.toString().trim().toLowerCase()
  //     )
  //   });
  // }

  /*  */
  // searchByCat() {
  //   console.log(this.category);
  //   if (this.category != "") {
  //     this.movieData = this.movieDataWithoutFilter.filter((res: { movieName: string; }) => {
  //       return res.movieName.toLocaleLowerCase().match(this.category.toLocaleLowerCase())
  //     });
  //   } else if (this.category == "") {
  //     this.movieData = this.movieDataWithoutFilter
  //   }
  // }

}
