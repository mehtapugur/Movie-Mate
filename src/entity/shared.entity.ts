import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Shared")
export class Shared {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 10 })
  type: string;

  @Column({ default: 0 })
  likes: number;

  @Column()
  user_id: number;
}
