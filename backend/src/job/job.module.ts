import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobSchema } from './schema/job.schema';
import { AuthModule } from '../auth/auth.module';
import { CategorySchema } from '../category/schema/category.schema';
import { SkillSchema } from '../skill/schema/skill.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Skill', schema: SkillSchema },
    ]),
    AuthModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
