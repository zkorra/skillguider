import { Component, OnInit } from '@angular/core';
import { CategoryState } from '../../category/category.state';
import { JobState } from '../../job/job.state';
import {
  GetCategories,
  SetSelectedCategory,
} from '../../category/category.action';
import { SearchJobs, SetSelectedJob } from '../../job/job.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  displayModal = false;

  selectedResult: any = {};

  constructor(private store: Store, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.store.dispatch(new GetCategories()).toPromise();
  }

  onSearch(event: string): any {
    const { query }: any = event;
    this.store.dispatch(new SearchJobs(query));
  }

  displayDialog(event: any): any {
    this.text = event.item.title;
    this.displayModal = true;
    this.selectedResult = event.item;
  }

  onSelectCategory(category: any): any {
    this.store.dispatch(new SetSelectedCategory(category));
    this.router.navigate(['/category', category._id]);
  }

  onSelectJob(job: any): any {
    this.displayModal = false;
    this.store.dispatch(new SetSelectedJob(job));
    this.router.navigate(['/myskill'], { queryParams: { job: job._id } });
  }
}
