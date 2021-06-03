import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { use } from 'passport';
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

}
