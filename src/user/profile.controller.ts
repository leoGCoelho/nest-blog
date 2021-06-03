import { Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {
    constructor(private userService:UserService){}

    @Get('/:username')
    async findProfile(@Param('username') username:string){
        const user = await this.userService.findByUsername(username);
        if(!user)
            throw new NotFoundException("Usuario não encontrado");
        
        return { profile: user };
    }

    @Post('/:username/follow')
    @UseGuards(AuthGuard())
    async followUser(@User() profile:UserEntity, @Param('username') username:string){
        const user = await this.userService.followUser(profile, username);
        return { profile: user };
    }

    @Delete('/:username/follow')
    @UseGuards(AuthGuard())
    async unfollowUser(@User() profile:UserEntity, @Param('username') username:string){
        const user = await this.userService.unfollowUser(profile, username);
        return { profile: user };
    }

}
