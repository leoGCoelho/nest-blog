import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from "./abstract-entity";
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity extends AbstractEntity{
    @Column()
    @IsEmail()
    email: string;

    @Column({unique:true})
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default:''})
    bio: string;

    @Column({default:null, nullable:true})
    image: string | null;

    @ManyToMany(type=>UserEntity, user=>user.following)
    @JoinTable()
    followers: UserEntity[];

    @ManyToMany(type=>UserEntity, user=>user.followers)
    following: UserEntity[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10);
    }

    async comparePassword(sendPassword: string){
        return await bcrypt.compare(sendPassword, this.password);
    }

    toJSON(){
        return classToPlain(this);
    }

    toProfile(user?: UserEntity){
        let following = null;

        if(user)
            following = this.followers.includes(user);
        const profile:any = this.toJSON();
        delete profile.followers;
        return {...profile, following};
    }
}