import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Comments")
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  data_id: string;

  @Column({ length: 255 })
  comments: string;
}
