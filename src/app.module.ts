import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterNumModule } from './counter-num/counter-num.module';
import { CounterModule } from './counter/counter.module';
import { UsersModule } from './users/users.module';
import { ServiceModule } from './counter-service/counter-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNC === 'true',
      logging: true,
    }),

    CounterNumModule,
    CounterModule,
    UsersModule,
    ServiceModule
  ],

})
export class AppModule { }
