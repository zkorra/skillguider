import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryState } from '../../../category/category.state';
import {
  GetCategories,
  AddCategory,
  DeleteCategory,
  UpdateCategory,
} from '../../../category/category.action';
import { SkillState } from '../../../skill/skill.state';
import { GetSkills } from '../../../skill/skill.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AdminCategoryComponent implements OnInit {
  @Select(CategoryState.getCategoryList)
  categories: Observable<any> | undefined | any;

  @Select(SkillState.getSkillList)
  skills: Observable<any> | undefined | any;

  categoryDialogOpen = false;

  categoryList!: any[];

  category: any;

  isOpenCreateCategory = false;

  selectedSkillSet: any;

  skillList: any;

  skillDict: any = {};

  constructor(
    private store: Store,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.store.dispatch(new GetSkills()).toPromise();

    await this.skills.subscribe((data: any) => {
      if (data) {
        this.skillList = data;

        this.skillList.forEach((skill: any) => {
          this.skillDict[skill._id] = skill.title;
        });
      }
    });

    this.getCategories();
  }

  async getCategories(): Promise<void> {
    await this.store.dispatch(new GetCategories()).toPromise();

    await this.categories.subscribe((data: any) => {
      if (data) {
        this.categoryList = data;
      }
    });
  }

  newCategory(): any {
    this.category = {};
    this.selectedSkillSet = [];
    this.categoryDialogOpen = true;
    this.isOpenCreateCategory = true;
  }

  async editCategory(categoryData: any): Promise<any> {
    this.category = await { ...categoryData };
    this.selectedSkillSet = await this.category.skillset.map((skill: any) => {
      return skill.skill_id;
    });
    this.categoryDialogOpen = true;
    this.isOpenCreateCategory = false;
  }

  async saveCategory(): Promise<any> {
    const selectedSkillSetObjectArray: any = [];

    this.selectedSkillSet.forEach((element: any) => {
      selectedSkillSetObjectArray.push({ skill_id: element });
    });

    const data = {
      title: this.category.title,
      skillset: selectedSkillSetObjectArray,
    };

    this.isOpenCreateCategory
      ? // create method
        await this.store
          .dispatch(new AddCategory(data))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Category Created',
                life: 3000,
              });
              this.getCategories();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise()
      : // edit method
        await this.store
          .dispatch(new UpdateCategory(data, this.category._id))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Category Updated',
                life: 3000,
              });
              this.getCategories();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise();

    this.closeDialog();
  }

  async deleteCategory(categoryData: any): Promise<any> {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete "' + categoryData.title + '" ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.store
          .dispatch(new DeleteCategory(categoryData._id))
          .pipe(
            map((res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Category Deleted',
                life: 3000,
              });
              this.getCategories();
            }),
            catchError(async (error) =>
              this.messageService.add({
                severity: 'error',
                summary: `${error.status}`,
                detail: `${error.error.message}`,
              })
            )
          )
          .toPromise();
      },
    });
  }

  closeDialog(): any {
    this.category = {};
    this.selectedSkillSet = [];
    this.categoryDialogOpen = false;
  }
}
