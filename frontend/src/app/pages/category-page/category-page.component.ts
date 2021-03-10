import { Component, OnInit } from '@angular/core';
import { CategoryState } from '../../states/category.state';
import { JobState } from '../../states/job.state';
import { Category } from '../../models/category.model';
import {
  GetCategories,
  SetSelectedCategory,
} from '../../actions/category.action';
import { GetJobs, SearchJobs } from '../../actions/job.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  @Select(CategoryState.getCategoryList)
  categories: Observable<any> | undefined;

  @Select(JobState.getJobList)
  jobs: Observable<any> | undefined;

  text: any;

  // results: any;

  displayModal = false;

  selectedResult: any = {};

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
  }

  onSearch(event: string): any {
    const { query }: any = event;
    this.store.dispatch(new SearchJobs(query));
  }

  displayDialog(event: any): any {
    this.text = '';
    this.displayModal = true;
    this.selectedResult = event.item;
  }

  onSelectCategory(category: any): any {
    this.store.dispatch(new SetSelectedCategory(category));
  }

  onSelectJob(job: any): any {
    this.displayModal = false;
    console.log(job);
  }
}
