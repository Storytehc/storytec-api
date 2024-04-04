import { IsNumber, IsString } from 'class-validator';

export class AssetData {
  @IsString()
  dataUrl: string;
}

export class UriGeneratorParams {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  percentOwnership?: number;
}

export class MintTokenParams {
  @IsString()
  token: string;

  @IsNumber()
  amountToMint: number;
}
