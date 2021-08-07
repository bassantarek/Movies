import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieModel } from './movies.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  formValue !: FormGroup;
  movieModelObj!: MovieModel;
  movieData !: MovieModel[];
  showAdd !: boolean;
  showUpdate !: boolean;
  movieNameFilter: string = "";
  categoryFilter : string = "";
  category: string = '';
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      movieName: [''],
      category: ['']
    });

    this.getAllMovie();
  }

  clickAddMovie() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  /* POST MOVIE */
  postMovieDetails() {
    // this.movieModelObj.name = this.formValue.value.movieName;
    // this.movieModelObj.categoryName = this.formValue.value.category;

    this.api.postMovie(this.movieModelObj)
    .subscribe(res => {
        console.log(res);
        alert("Movie is added successfully ^_^");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllMovie();
      }, err => {
        alert("Something went wrong XX ")
      });
      console.log("Tessssssssssssssssst",this.movieModelObj);
  }


  /* GET MOVIE */
  getAllMovie() {
    this.api.getMovie()
      .subscribe(res => {
        this.movieData = res;
      });
      console.log(this.movieData);
  }

  /* DELETE MOVIE */
  deleteMovie(row: any) {
    this.api.deleteMovie(row.id)
      .subscribe(res => {
        alert("Movie Deleted");
        this.getAllMovie();
      });
  }

  /* UPDATE MOVIE */
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.movieModelObj.id = row.id;
    this.formValue.controls['movieName'].setValue(row.movieName);
    this.formValue.controls['category'].setValue(row.category);
  }

  updateMovieDetails() {
    this.movieModelObj.name = this.formValue.value.movieName;
    this.movieModelObj.categoryName = this.formValue.value.category;
    this.api.updateMovie(this.movieModelObj)
      .subscribe(res => {
        alert("Updated Successfully ^_^");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllMovie();
      });
  }

  /* SEARCH */
  FilterFn() {
    let movieNameFilter = this.movieNameFilter;
    let movieDataWithFilter = this.movieData;
    // console.log("IF movieDataWithFilter",movieDataWithFilter);
    // console.log("IF movieData", this.movieData);
    if(movieNameFilter != "") {
      console.log("Test Value : ",movieNameFilter);
      // console.log("Test Value movie DataWithFilter: ",movieDataWithFilter);

      this.movieData = movieDataWithFilter.filter(function (el: any) {
        return el.movieName.toString().toLowerCase().includes(
          movieNameFilter.toString().trim().toLowerCase()
        );
      });
      movieDataWithFilter = this.movieData;
    } else if (movieNameFilter == "") {
      //  this.movieData = movieDataWithFilter;
      this.getAllMovie();
      console.log("else if movieData", this.movieData);
      console.log("else if movieDataWithFilter", movieDataWithFilter);
    }
    else if (this.movieData.length === 0) {
      //  this.movieData = movieDataWithFilter;
      this.getAllMovie();
      console.log("else if movieData", this.movieData);
      console.log("else if movieDataWithFilter", movieDataWithFilter);
    }
  }

  /*  */
  searchByCat() {
    let categoryFilter = this.categoryFilter;
    let movieDataWithFilter = this.movieData;
    console.log(this.category);
    if (this.categoryFilter != "") {
      this.movieData = movieDataWithFilter.filter(function (el: any) {
        return el.category.toString().toLowerCase().includes(
          categoryFilter.toString().trim().toLowerCase()
        );
      });
    } else if (this.categoryFilter == "") {
      this.getAllMovie();
      // this.movieData = movieDataWithFilter;
    }
  }

}
