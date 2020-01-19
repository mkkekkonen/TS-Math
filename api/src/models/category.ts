import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Subcategory } from './subcategory';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  index: number;

  @OneToMany(t => Subcategory, subcatecory => subcatecory.category)
  subcategories: Subcategory[];
}
