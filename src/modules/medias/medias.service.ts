import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Media } from "src/entities/transaction_service/media.entity";
import { MediasRepository } from "./medias.repository";

@Injectable()
export class MediasService extends BaseService<Media, MediasRepository> {
  constructor(private readonly mediasRepository: MediasRepository) {
    super(mediasRepository);
  }
}
