import {
  Controller,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdsQuery } from "src/common/type";
import { FileProducerService } from "src/shared/file/file.producer.service";
import { MediasService } from "./medias.service";
import { EntityId } from "typeorm/repository/EntityId";

@Controller("medias")
@ApiTags("medias")
export class MediasController {
  constructor(
    private readonly mediasService: MediasService,
    private fileProducerService: FileProducerService,
  ) {}

  @Delete()
  async deleteMedias(@Query() query: IdsQuery): Promise<string> {
    try {
      const medias = await this.mediasService.findByIds(
        query.ids as [EntityId],
      );
      this.mediasService.deleteItems(query.ids);
      await this.fileProducerService.deleteFiles(
        medias.map((media) => media.url),
      );
      return "Success";
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
