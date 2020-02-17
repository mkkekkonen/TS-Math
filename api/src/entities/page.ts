import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Subcategory } from './subcategory';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  urlTitle: string;

  @Column()
  index: number;

  @ManyToOne(t => Subcategory, subcategory => subcategory.pages, { onDelete: 'SET NULL' })
  subcategory: Subcategory;
}
