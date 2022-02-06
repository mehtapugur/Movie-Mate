import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Movie")
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ length: 100 })
  description: string;
}
