import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO, LoginUserDTO } from '../models/user.model';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post() 
    register(@Body(ValidationPipe) credentials: { user: RegisterUserDTO }) {
        return this.authService.register(credentials.user);
    }

    @Post('/login') 
    login(@Body(ValidationPipe) credentials: { user: LoginUserDTO }) {
        return this.authService.login(credentials.user);
    }
}
