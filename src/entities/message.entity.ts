import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Users from './users.entity';
import TextMessages from './text.messages.entity';

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

  @ManyToOne(() => Users, {onDelete:"CASCADE"})
  @JoinColumn({ name: 'sender_user_id', referencedColumnName: 'id' })
  senderUser: Users;

  @ManyToOne(() => Users, {onDelete:"CASCADE"})
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @OneToOne(() => TextMessages, textMessage => textMessage.message, {onDelete:"SET NULL"})
  @JoinColumn()
  text: TextMessages;
}

export default Messages