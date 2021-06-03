import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConectionsService } from './database-connection.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConectionsService
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
