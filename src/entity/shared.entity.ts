import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Shared")
export class Shared {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 10 })
  type: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  comments: number;

  @Column()
  user_id: number;

  @CreateDateColumn({ default: Date.now(), type: "date" })
  sharedAt: Date;
}
