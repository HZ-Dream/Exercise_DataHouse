import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('board_items')
export class BoardItem {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  columnId!: string;

  @Column()
  order!: number;

  @Column({ nullable: true })
  variant!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  bullets!: string[];

  @Column({ nullable: true })
  date!: string;

  @Column({ nullable: true })
  emoji!: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  assignees!: string[];

  @Column({ nullable: true })
  color!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content!: string;
}