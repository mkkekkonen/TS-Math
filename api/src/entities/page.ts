import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Subcategory } from './subcategory';

@Entity('page')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  urlTitle: string;

  @Column({ nullable: true })
  index: number;

  @ManyToOne(t => Subcategory, subcategory => subcategory.pages, { onDelete: 'SET NULL' })
  subcategory: Subcategory;

  @Column({ nullable: true })
  subcategoryId: number;
}
