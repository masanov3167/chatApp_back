import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Users from './users.entity';

@Entity({
  name:"chat_messages"
})
class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({type:"number", nullable:false})
  sender_user_id: number;

  @Column({type:"number", nullable:false})
  user_id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'sender_user_id', referencedColumnName: 'id' })
  senderUser: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}

export default Messages