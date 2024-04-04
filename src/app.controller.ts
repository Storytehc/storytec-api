import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { AppService, AssetService } from './app.service';
import {
  AssetData,
  MintTokenParams,
  UriGeneratorParams
} from './typing/validators';

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
  @HttpCode(HttpStatus.CREATED)
  async uploadAsset(@Body() assetData: AssetData) {
    // call assetService to upload to cloudinary
    return await this.assetService.uploadAsset(assetData);
  }

  @Post('create-token')
  @HttpCode(HttpStatus.CREATED)
  createToken(@Body() uriGenerator: UriGeneratorParams) {
    return this.assetService.createToken(uriGenerator);
  }

  @Post('mint-token')
  @HttpCode(HttpStatus.CREATED)
  async mintToken(@Body() mintTokenBody: MintTokenParams) {
    return await this.assetService.mintToken(mintTokenBody);
  }
}
