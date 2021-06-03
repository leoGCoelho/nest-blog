import { Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { AltAuthGuard } from 'src/auth/alt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {
    constructor(private userService:UserService){}

    @Get('/:username')
    @UseGuards(new AltAuthGuard())
    async findProfile(@User() profile: UserEntity, @Param('username') username:string){
        const user = await this.userService.findByUsername(username, profile);
        if(!user)
            throw new NotFoundException("Usuario não encontrado");
        
        return { profile: user };
    }

    @Post('/:username/follow')
    @HttpCode(200)
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
