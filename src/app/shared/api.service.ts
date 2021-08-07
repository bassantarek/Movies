import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { MovieModel } from '../site/movies/movies.model';
import { CategoryModel } from '../site/categories/categories.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 URL = "https://localhost:44396";
  constructor(private http: HttpClient) { }

  /* POST MOVIE */
  postMovie(data:any) {
    return this.http.post<MovieModel[]>(`${this.URL}/api/Movie/AddMovie`, data)
  }

    /* GET MOVIE */
    getMovie() {
      return this.http.get<MovieModel[]>(`${this.URL}/api/Movie/GetMovies`)
    }

     /* UPDATE MOVIE */
     updateMovie(data:any) {
      return this.http.put<MovieModel[]>(`${this.URL}/api/Movie/EditMovie`,data)
    }

    /* DELETE MOVIE */
    deleteMovie(id:number) {
      return this.http.delete<MovieModel[]>(`${this.URL}/api/Movie/DeleteMovie/${id}`)
    }

    /* ----------------- */

      /* POST CATEGORY */
  postCategory(data:any) {
    return this.http.post<CategoryModel[]>(`${this.URL}/api​/Category​/AddCategory`, data)
  }

    /* GET CATEGORY */
    getCategory() {
      return this.http.get<CategoryModel[]>(`${this.URL}/api/Movie/GetMovies`)
    }

     /* UPDATE CATEGORY */
     updateCategory(data:any) {
      return this.http.put<CategoryModel[]>(`${this.URL}/api/Category/EditCategory`,data)
    }

    /* DELETE CATEGORY */
    deleteCategory(id:number) {
      return this.http.delete<any>(`${this.URL}/api/Category/DeleteCategory/${id}`)
    }
}
