import { Exclude } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
//V4 => números aleatórios
import { v4 as uuid } from "uuid"

//referente a tabela e colunas
@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Exclude() //tira a senha da busca!!!
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //método construtor
  constructor() {
    //nulo, indefinido, vazio
    if(!this.id){
      this.id = uuid()
    }
  }

}

export { User };


/* Entidade < - > ORM < - > BD
*  (user)      Repositório  (users)
*
* Repositório faz a comunicação entre Entidade e BD
*/