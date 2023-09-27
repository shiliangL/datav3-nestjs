import bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import { Column, BeforeInsert, PrimaryGeneratedColumn } from "typeorm";

export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column("simple-enum", {
    enum: ["root", "author", "visitor"],
  })
  role: string;

  @Column({
    name: "create_time",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column({
    name: "update_time",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date;

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
