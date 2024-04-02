import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, AssetService } from './app.service';
import { AssetData } from './typing/validators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome() {
    return 'Welcome. App is running';
  }

  @Get('health')
  healthCheck() {
    // perform health check
    return this.appService.healthCheck();
  }
}

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('upload')
  async uploadAsset(@Body() assetData: AssetData) {
    // call assetService to upload to cloudinary
    return await this.assetService.uploadAsset(assetData);
  }

  // @Post()
  // mintAsset() {}
}
