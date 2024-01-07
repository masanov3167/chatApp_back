import { Entity, PrimaryGeneratedColumn, Column,  JoinColumn, OneToOne } from 'typeorm';
import Messages from './message.entity';

@Entity({
  name:"chat_voice_messages"
})
class VoiceMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"number", nullable: false})
  message_id: number;

  @Column({type:"varchar", nullable: false})
  path: string;

  @Column({ nullable: false})
  duration: number;

  @Column({ nullable: false})
  size: number;

  @OneToOne(() => Messages, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'message_id', referencedColumnName: 'id' })
  message: Messages;
}

export default VoiceMessages