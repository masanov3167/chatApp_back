import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "chat_users",
})
class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: true, unique: true })
  phone: string;

  @Column({ type: "varchar", nullable: true, unique: true })
  login: string;

  @Column({ type: "varchar", nullable: true, unique: false })
  parol: string;
}

export default Users;
