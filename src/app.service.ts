import { Injectable } from '@nestjs/common';
import { uploadFileToCloudinary } from './storage/cloudinary';
// import { BadRequest } from './exceptions/custom/BadRequest';

@Injectable()
export class AppService {
  healthCheck() {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'Server running on http://localhost:8000/',
      timestamp: Date.now()
    };
    try {
      return healthCheck;
    } catch (err) {
      healthCheck.message = err;
    }
  }
}

@Injectable()
export class AssetService {
  async uploadAsset(assetData: { dataUrl: string }) {
    // const { dataUrl } = assetData;
    // if (!dataUrl) throw new BadRequest();

    const response = await uploadFileToCloudinary(assetData.dataUrl);
    // console.log(response); // just log out the response for now.
    return response;
  }

  mintAsset() {}
}
