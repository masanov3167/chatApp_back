import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Messages from './message.entity';

@Entity({
  name:"chat_text_messages"
})
class TextMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message_id: number;

  @Column()
  text: string;

  @OneToOne(() => Messages)
  @JoinColumn({ name: 'message_id', referencedColumnName: 'id' })
  message: Messages;
}

export default TextMessages