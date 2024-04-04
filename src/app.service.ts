import { Injectable } from '@nestjs/common';
import { uploadFileToCloudinary } from './storage/cloudinary';
import { MintTokenParams, UriGeneratorParams } from './typing/validators';
import { createNewTokenOnBlockchain } from './web3/scripts/newToken';
// import { showExplorerUrl } from './web3/lib/helpers';
// import { createTokenOnBlockchain } from './web3/scripts/createToken';
import { showExplorerUrl } from './web3/lib/helpers';
import { mintTokenOnBlockchain } from './web3/scripts/mintToken';
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

  async createToken(uriGenerator: UriGeneratorParams) {
    // console.log(uriGenerator);
    const response = await createNewTokenOnBlockchain(uriGenerator);
    return {
      ...response,
      explorerUrl: showExplorerUrl({ address: response.token })
    };
  }

  async mintToken(mintTokenBody: MintTokenParams) {
    await mintTokenOnBlockchain(mintTokenBody);
    return {
      token: mintTokenBody.token,
      explorerUrl: showExplorerUrl({ address: mintTokenBody.token })
    };
  }
}
