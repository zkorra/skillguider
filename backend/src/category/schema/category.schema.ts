import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ _id: false })
class Skill {
  @Prop()
  skill_id: string;
}
export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema()
export class Category {
  @Prop()
  title: string;

  @Prop({ type: [SkillSchema], default: [] })
  skillset: Skill[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
