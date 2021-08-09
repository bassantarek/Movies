import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { MovieModel } from '../site/movies/movies.model';
import { CategoryModel } from '../site/categories/categories.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 URL = "https://localhost:44396";
  constructor(private http: HttpClient) { }

  /* POST MOVIE */
  postMovie(data:any) {
    return this.http.post(`${this.URL}/api/Movie/AddMovie`, data)
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


}
