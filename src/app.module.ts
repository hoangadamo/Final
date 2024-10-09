import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database';
import { UsersModule } from './modules';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, PostgresqlModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
