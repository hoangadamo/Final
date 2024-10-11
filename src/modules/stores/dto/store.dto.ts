import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
