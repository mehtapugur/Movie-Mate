import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Data")
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ default: false })
  share: boolean;

  @Column({ length: 10 })
  type: string;

  @Column()
  user_id: number;
}
