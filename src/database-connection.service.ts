import { Injectable } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConectionsService implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions{
        return {
            name: 'default',
            type: 'postgres',
            host: process.env.DATABASE_HOST, 
            port: Number(process.env.DATABASE_PORT), 
            username: process.env.DATABASE_USER, 
            password: process.env.DATABASE_PASSWORD, 
            database: process.env.DATABASE_DB,

            synchronize: true,
            dropSchema: true,
            logging: true,
            entities: ['dist/**/*.entity.js'],
        };
    }
}