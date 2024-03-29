import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SkillState } from '../../skill/skill.state';
import { SetSelectedSkill, SubmitSkill } from '../../skill/skill.action';
import { JobState } from '../../job/job.state';
import { GetJobById } from '../../job/job.action';
import { CategoryState } from '../../category/category.state';
import { GetCategoryById } from '../../category/category.action';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit {
  @Select(SkillState.getResultSkillList)
  skills: Observable<any> | undefined | any;

  @Select(JobState.getSelectedJob)
  selectedJob: Observable<any> | undefined | any;

  @Select(CategoryState.getSelectedCategory)
  selectedCategory: Observable<any> | undefined | any;

  job: any;

  jobId: any;

  jobSkills: any;

  categorySkills: any;

  category: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.job) {
        this.jobId = params.job;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.selectedJob.subscribe((data: any) => {
      if (data) {
        this.job = data;
      }
    });

    if (!this.job) {
      await this.store.dispatch(new GetJobById(this.jobId)).toPromise();

      await this.selectedJob.subscribe((data: any) => {
        if (data) {
          this.job = data;
        } else {
          this.router.navigate(['']);
        }
      });
    }

    await this.store
      .dispatch(new GetCategoryById(this.job.category_id))
      .toPromise();

    await this.selectedCategory.subscribe((data: any) => {
      if (data) {
        this.category = data;
      } else {
        this.router.navigate(['']);
      }
    });

    await this.skills.subscribe(async (data: any) => {
      if (!data) {
        await this.store
          .dispatch(
            new SubmitSkill({
              job_id: this.jobId,
              skillset: [],
            })
          )
          .toPromise();
      }

      this.categorySkills = data
        .filter((skill: any) => skill.priority === 'Category')
        .sort((a: any, b: any) => a.title.localeCompare(b.title));

      this.jobSkills = data
        .filter(
          (skill: any) =>
            skill.priority === 'High' || skill.priority === 'Normal'
        )
        .sort((a: any, b: any) => a.title.localeCompare(b.title))
        .sort((a: any, b: any) => a.priority.localeCompare(b.priority));
    });
  }

  async onSelectResult(skill: any): Promise<void> {
    await this.store.dispatch(new SetSelectedSkill(skill)).toPromise();
    this.router.navigate(['/learn'], {
      queryParams: { skill: skill.title },
    });
  }
}
