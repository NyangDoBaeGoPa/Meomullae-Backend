import { ApiProperty } from '@nestjs/swagger';

export abstract class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
