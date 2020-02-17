import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Category } from './category';
import { Page } from './page';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  index: number;

  @ManyToOne(t => Category, category => category.subcategories, { onDelete: 'SET NULL' })
  category: Category;

  @OneToMany(t => Page, page => page.subcategory)
  pages: Page[];
}
