import { Component, OnInit } from '@angular/core';
import { CategoryModel } from './categories.model';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  formValue !: FormGroup;
  categoryModelObj: CategoryModel = new CategoryModel();
  categoryData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  categoryNameFilter: string = "";
  // movieDataWithoutFilter !: any;
  categoryDataWithoutFilter: any = [];
  category: string = '';
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      movieName: [''],
      category: ['']
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
    this.categoryModelObj.movieName = this.formValue.value.movieName;
    this.categoryModelObj.category = this.formValue.value.category;

    this.api.postCategory(this.categoryModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Movie is added successfully ^_^");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllCategory();
      }, err => {
        alert("Something went wrong XX ")
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
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.categoryModelObj.id = row.id;
    this.formValue.controls['movieName'].setValue(row.movieName);
    this.formValue.controls['category'].setValue(row.category);
  }

  updateCategoryDetails() {
    this.categoryModelObj.movieName = this.formValue.value.movieName;
    this.categoryModelObj.category = this.formValue.value.category;
    this.api.updateMovie(this.categoryModelObj)
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
