import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>){}

    async findByUsername(username:string) : Promise<UserEntity>{
        return this.userRepo.findOne({where: {username}});
    }

    async updateUser(username:string, data: UpdateUserDTO){
        await this.userRepo.update({username}, data);
        return this.userRepo.findOne({where: {username}});
    }

    async followUser(currUser:UserEntity, username:string){
        const user = await this.userRepo.findOne({where:{username}, relations:['followers']});
        user.followers.push(currUser);

        await user.save();
        return user.toProfile(currUser);
    }

    async unfollowUser(currUser:UserEntity, username:string){
        const user = await this.userRepo.findOne({where:{username}, relations:['followers']});
        user.followers = user.followers.filter(follower=>follower !== currUser);

        await user.save();
        return user.toProfile(currUser);
    }
}

