import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

import { Category } from './category';
import { Page } from './page';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  index: number;

  @ManyToOne(t => Category, category => category.subcategories)
  category: Category;

  @OneToOne(t => Page, page => page.subcategory)
  page: Page;
}
