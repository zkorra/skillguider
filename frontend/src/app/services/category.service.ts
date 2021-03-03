import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  allEmployees: Array<Category> = [];

  fetchCategories(): any {
    return this.http.get<Category[]>(
      'http://localhost:3000/api/category/all/'
    );
  }

  deleteCategory(id: number): any {
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  addCategory(payload: Category): any {
    return this.http.post<Category>(
      'https://jsonplaceholder.typicode.com/todos',
      payload
    );
  }

  updateCategory(payload: Category, id: number): any {
    return this.http.put<Category>(
      'https://jsonplaceholder.typicode.com/todos/' + id,
      payload
    );
  }
}