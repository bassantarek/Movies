import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 URL = "https://localhost:44396";
  constructor(private http: HttpClient) { }

  /* POST MOVIE */
  postMovie(data:any) {
    return this.http.post<any>(`${URL}/api/Movie/AddMovie`, data)
    .pipe(map((res:any) => {
      return res;
    }));
  }

    /* GET MOVIE */
    getMovie() {
      return this.http.get<any>(`${this.URL}/api/Movie/GetMovies`)
      .pipe(map((res:any) => {
        return res;
      }));
    }

     /* UPDATE MOVIE */
     updateMovie(data:any) {
      return this.http.put<any>(`URL/api/Movie/EditMovie`,data)
      .pipe(map((res:any) => {
        return res;
      }));
    }

    /* DELETE MOVIE */
    deleteMovie(id:number) {
      return this.http.delete<any>(`URL/api/Movie/DeleteMovie/${id}`)
      .pipe(map((res:any) => {
        return res;
      }));
    }

    /* ----------------- */

      /* POST CATEGORY */
  postCategory(data:any) {
    return this.http.post<any>(`URL/api​/Category​/AddCategory`, data)
    .pipe(map((res:any) => {
      return res;
    }));
  }

    /* GET CATEGORY */
    getCategory() {
      return this.http.get<any>(`URL/api/Movie/GetMovies`)
      .pipe(map((res:any) => {
        return res;
      }));
    }

     /* UPDATE CATEGORY */
     updateCategory(data:any) {
      return this.http.put<any>("URL/api/Category/EditCategory",data)
      .pipe(map((res:any) => {
        return res;
      }));
    }

    /* DELETE CATEGORY */
    deleteCategory(id:number) {
      return this.http.delete<any>(`URL/api/Category/DeleteCategory/${id}`)
      .pipe(map((res:any) => {
        return res
      }));
    }
}
