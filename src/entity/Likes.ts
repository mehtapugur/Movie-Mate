import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Likes")
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  data_id: string;
}
