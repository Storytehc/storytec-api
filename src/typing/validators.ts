import { IsString } from 'class-validator';

export class AssetData {
  @IsString()
  dataUrl: string;
}
