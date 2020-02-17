import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Subcategory } from './subcategory';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  index: number;

  @OneToMany(t => Subcategory, subcategory => subcategory.category)
  subcategories: Subcategory[];
}
