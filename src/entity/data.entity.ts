import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Data")
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ default: false })
  share: boolean;

  @Column({ length: 10 })
  type: string;

  @Column({ default: 0 })
  like_count: number;

  @Column({ default: false })
  liked: boolean;

  @Column()
  user_id: number;
}
