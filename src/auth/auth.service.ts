import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RegisterDTO, LoginDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtService: JwtService,
    ){}
    
    async register(credentials: RegisterDTO){
        try{
            const user = this.userRepo.create(credentials);
            await user.save();

            const payload = {username:user.username};
            const token = this.jwtService.sign(payload);

            return {user:{ ...user.toJSON(), token }};

        }catch(err){
            if(err.code === '23505')
                throw new ConflictException('Esse nome de usuário já existe');     
            
            throw new InternalServerErrorException();
        }
    }

    async login(credentials: LoginDTO) {
        try{
            const user = await this.userRepo.findOne({where: {email: credentials.email}});
            const pwrd = await(user.comparePassword(credentials.password));
            if(user && pwrd){
                const payload = {username:user.username};
                const token = this.jwtService.sign(payload);
                return {user:{ ...user.toJSON(), token }};
            }
            
            throw new UnauthorizedException('Email e/ou Senha Invalidos');
            
        }catch (err){
            throw new UnauthorizedException('Email e/ou Senha Invalidos');
        }
    }
}
