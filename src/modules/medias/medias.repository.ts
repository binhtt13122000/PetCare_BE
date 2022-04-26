import { EntityRepository, Repository } from "typeorm";
import { Media } from "src/entities/transaction_service/media.entity";

@EntityRepository(Media)
export class MediasRepository extends Repository<Media> {}
