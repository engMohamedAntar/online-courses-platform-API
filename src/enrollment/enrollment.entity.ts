import { IsInt, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

//enrollment.entity.ts
export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Column()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Column()
  courseId: number;

  @IsNotEmpty()
  @Column()
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
