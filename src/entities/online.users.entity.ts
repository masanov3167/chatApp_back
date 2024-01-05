import { Entity, PrimaryGeneratedColumn, Column,  JoinColumn, OneToOne } from 'typeorm';
import Users from './users.entity';

@Entity({
  name:"chat_online_users"
})
class OnlineUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar", nullable:false})
  socket_id: string;

  @Column({type:"number", nullable:false})
  user_id: number;

  @OneToOne(() => Users, {onDelete:"CASCADE"})
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}

export default OnlineUsers