import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CategoryModel } from '../site/categories/categories.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL = "https://localhost:44396";
  constructor(private http: HttpClient) { }

  /* POST CATEGORY */
  postCategory(data:any) {
    return this.http.post(`${this.URL}/api/Category/AddCategory`, data)
  }

    /* GET CATEGORY */
    getCategory() {
      return this.http.get<CategoryModel[]>(`${this.URL}/api/Category/GetCategories`)
    }

     /* UPDATE CATEGORY */
     updateCategory(data:any) {
      return this.http.put(`${this.URL}/api/Category/EditCategory`,data)
    }

    /* DELETE CATEGORY */
    deleteCategory(id:number) {
      return this.http.delete<any>(`${this.URL}/api/Category/DeleteCategory/${id}`)
    }
}
