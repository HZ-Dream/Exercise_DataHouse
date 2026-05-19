import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardItemModule } from './modules/boarditems/boarditem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'kanban_db',
      autoLoadEntities: true,
      synchronize: true
    }),

    BoardItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
