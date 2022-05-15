import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { PageMetaDtoParameters } from "./page-interface";

export class PageMetaDto {
  @ApiProperty()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty()
  @Type(() => Number)
  readonly limit: number;

  @ApiProperty()
  @Type(() => Number)
  readonly itemCount: number;

  @ApiProperty()
  @Type(() => Number)
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
