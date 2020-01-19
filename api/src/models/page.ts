import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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

  @OneToOne(t => Subcategory, subcategory => subcategory.)
  subcategory: Subcategory;
}
