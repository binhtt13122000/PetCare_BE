import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageDto } from "src/common/page.dto";
import { Post } from "src/entities/transaction_service/post.entity";
import { PostsRepository } from "./posts.repository";
import { Post as PostEntity } from "src/entities/transaction_service/post.entity";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PostsOptionDto } from "./dto/post-option.dto";

@Injectable()
export class PostsService extends BaseService<Post, PostsRepository> {
  constructor(private readonly postsRepository: PostsRepository) {
    super(postsRepository);
  }

  async featchPostList(
    pageOptionsDto: PostsOptionDto,
  ): Promise<PageDto<PostEntity>> {
    const queryBuilder = await this.postsRepository.createQueryBuilder("post");

    queryBuilder
      .innerJoinAndSelect("post.pet", "pet")
      .innerJoinAndSelect("post.medias", "medias")
      .innerJoinAndSelect("pet.breed", "breed")
      .innerJoinAndSelect("breed.species", "species")
      // .where("post.status = :status", {
      //   status: pageOptionsDto.status,
      // });
      .where("pet.gender = :gender AND breed.name ilike :name", {
        gender: pageOptionsDto.gender,
        name: "%" + pageOptionsDto.breedName + "%",
      });

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async fetchPost(
    pageOptionsDto: PostsOptionDto,
  ): Promise<PageDto<PostEntity>> {
    const queryBuilder = await this.postsRepository.createQueryBuilder("post");

    const checkAgeRange = pageOptionsDto.ageRange;
    const checkBreedName = pageOptionsDto.breedName;
    const checkGender = pageOptionsDto.gender;
    const checkType = pageOptionsDto.type;
    const checkIsSeed = pageOptionsDto.isSeed;
    const checkPrice = pageOptionsDto.price;
    const checkStatus = pageOptionsDto.status;
    const checkOrderName = pageOptionsDto.orderName;
    const AND = " and ";
    // const queryAgeRange = "";
    const queryBreedName = "breed.name ilike :name";
    const queryGender = "pet.gender = :gender";
    const queryIsSeed = "pet.isSeed = :isSeed";
    const queryPrice = "post.provisionalTotal < :provisionalTotal";
    const queryStatus = "post.status = :status";
    const queryType = "post.type = :type";
    queryBuilder
      .innerJoinAndSelect("post.pet", "pet")
      .innerJoinAndSelect("post.medias", "medias")
      .innerJoinAndSelect("pet.breed", "breed")
      .innerJoinAndSelect("breed.species", "species");

    if (
      checkBreedName &&
      checkGender &&
      checkIsSeed &&
      checkPrice &&
      checkStatus &&
      checkOrderName &&
      checkType
    ) {
      queryBuilder.where(
        // "pet.gender = :gender and pet.isSeed = :isSeed and breed.name ilike :name and post.provisionalTotal < :provisionalTotal and post.status = :status ",
        queryBreedName +
          AND +
          queryIsSeed +
          AND +
          queryGender +
          AND +
          queryPrice +
          AND +
          queryStatus +
          AND +
          queryType,
        {
          name: "%" + pageOptionsDto.breedName + "%",
          isSeed: pageOptionsDto.isSeed,
          gender: pageOptionsDto.gender,
          provisionalTotal: pageOptionsDto.price,
          status: pageOptionsDto.status,
          type: pageOptionsDto.type,
        },
      );
      if (checkOrderName == "name") {
        queryBuilder.orderBy("breed.name", pageOptionsDto.orderType);
      } else {
        queryBuilder.orderBy("post.provisionalTotal", pageOptionsDto.orderType);
      }
    } else if (
      checkGender &&
      checkIsSeed &&
      checkStatus &&
      checkOrderName &&
      checkType
    ) {
      queryBuilder.where(
        queryIsSeed +
          " and " +
          queryGender +
          " and " +
          queryStatus +
          " and " +
          queryType,
        {
          isSeed: pageOptionsDto.isSeed,
          gender: pageOptionsDto.gender,
          status: pageOptionsDto.status,
          type: pageOptionsDto.type,
        },
      );
      if (checkOrderName == "name") {
        queryBuilder.orderBy("breed.name", pageOptionsDto.orderType);
      } else {
        queryBuilder.orderBy("post.provisionalTotal", pageOptionsDto.orderType);
      }
    } else if (
      checkBreedName ||
      checkGender ||
      checkIsSeed ||
      checkPrice ||
      checkStatus ||
      checkOrderName
    ) {
      if (checkBreedName) {
      } else if (checkGender) {
        queryBuilder.where(queryGender, { gender: pageOptionsDto.gender });
      } else if (checkIsSeed) {
        queryBuilder.where(queryIsSeed, { isSeed: pageOptionsDto.isSeed });
      } else if (checkPrice) {
        queryBuilder.where(queryPrice, {
          provisionalTotal: pageOptionsDto.price,
        });
      } else if (checkType) {
        queryBuilder.where(queryType, { type: pageOptionsDto.type });
      } else if (checkStatus) {
        queryBuilder.where(queryStatus, { status: pageOptionsDto.status });
      } else if (checkOrderName) {
        if (checkOrderName == "name") {
          queryBuilder.orderBy("breed.name", pageOptionsDto.orderType);
        } else {
          queryBuilder.orderBy(
            "post.provisionalTotal",
            pageOptionsDto.orderType,
          );
        }
      }
    } else if (checkGender.length == undefined || !checkStatus || !checkType) {
      // If not GENDER, will have both male and female
      if (checkStatus && checkType) {
        queryBuilder.where(queryStatus + AND + queryType, {
          status: pageOptionsDto.status,
          type: pageOptionsDto.type,
        });
      }
      // If not TYPE, will have both breed and purchase
      if (checkStatus && checkGender) {
        queryBuilder.where(queryStatus + AND + queryGender, {
          status: pageOptionsDto.status,
          gender: pageOptionsDto.gender,
        });
      }
      // if not STATUS , will have REQUESTED, REJECTED,  PUBLISHED, WAITING_FOR_PAYMENT, CANCELED
      if (checkType && checkGender) {
        queryBuilder.where(queryType + AND + queryGender, {
          type: pageOptionsDto.type,
          gender: pageOptionsDto.gender,
        });
      }
    }
    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
