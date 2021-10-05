import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";


@Entity("compliments")
class Compliment {

  @PrimaryColumn()
  readonly id: string

  @Column()
  user_sender: string

  @JoinColumn({name: "user_sender"})
  @ManyToOne(() => User)
  userSender : User

  @Column()
  user_receiver: string

  @JoinColumn({name: "user_receiver"})
  @ManyToOne(() => User)
  userReceiver : User

  @Column()
  tag_id: string

  @JoinColumn({name: "tag_id"})
  @ManyToOne(() => Tag) 
  tag: Tag

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id){
      this.id = uuid()
    }
  }

}

export { Compliment }


/*
* Muitos elogios para uma Tag
* N -> 1 = @ManyToOne
*
* Todos os relacionamentos do Compliment
* serão ManyToOne !
*
* O JoinColumn retorna tudo!
*/