import { Module } from '@nestjs/common';
import { AppController, AssetController } from './app.controller';
import { AppService, AssetService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, AssetController],
  providers: [AppService, AssetService]
})
export class AppModule {}
