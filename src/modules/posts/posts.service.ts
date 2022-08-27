import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageDto } from "src/common/page.dto";
import { Post } from "src/entities/transaction_service/post.entity";
import { PostsRepository } from "./posts.repository";
import { Post as PostEntity } from "src/entities/transaction_service/post.entity";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PostsOptionDto } from "./dto/post-option.dto";
import { PostEnum } from "src/enum";
import { In } from "typeorm";

@Injectable()
export class PostsService extends BaseService<Post, PostsRepository> {
  constructor(private readonly postsRepository: PostsRepository) {
    super(postsRepository);
  }

  getOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id: id },
      relations: [
        "pet",
        "branch",
        "customer",
        "medias",
        "pet.breed",
        "pet.breed.species",
      ],
    });
  }

  getOneWithMedias(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id: id },
      relations: ["medias", "customer"],
    });
  }

  getPostsByPetId(petId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: {
        petId: petId,
        status: In([
          PostEnum.CANCELED,
          PostEnum.PUBLISHED,
          PostEnum.REJECTED,
          PostEnum.REQUESTED,
        ]),
      },
    });
  }

  async fetchPost(
    pageOptionsDto: PostsOptionDto,
  ): Promise<PageDto<PostEntity>> {
    const queryBuilder = await this.postsRepository.createQueryBuilder("post");

    // Add months to Date
    const dateFrom = new Date();
    const dateTo = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - pageOptionsDto.ageRangeFrom);
    dateTo.setMonth(dateTo.getMonth() - pageOptionsDto.ageRangeTo);

    // Check conditions
    // const checkAgeRangeFrom = pageOptionsDto.ageRangeFrom;
    // const checkAgeRangeTo = pageOptionsDto.ageRangeTo;
    // const checkBreedName = pageOptionsDto.breedName;
    // const checkGender = pageOptionsDto.gender;
    // const checkType = pageOptionsDto.type;
    // const checkIsSeed = pageOptionsDto.isSeed;
    // const checkPrice = pageOptionsDto.price;
    // const checkStatus = pageOptionsDto.status;
    const checkOrderName = pageOptionsDto.orderName;
    const AND = " and ";
    // const checkOption =
    //   checkGender && checkIsSeed && checkStatus && checkOrderName && checkType;

    // const checkAll =
    //   checkOption &&
    //   checkBreedName &&
    //   checkPrice &&
    //   checkAgeRangeFrom &&
    //   checkAgeRangeTo;

    // const checkBreedPriceAgeRange =
    //   checkBreedName && checkPrice && checkAgeRangeFrom && checkAgeRangeTo;

    // const checkOrField =
    //   checkBreedName ||
    //   checkGender ||
    //   checkIsSeed ||
    //   checkType ||
    //   checkPrice ||
    //   checkStatus ||
    //   checkOrderName ||
    //   checkAgeRangeFrom ||
    //   checkAgeRangeTo;

    // // Query of properties
    // const queryBreedName = "breed.name ilike :name";
    // const queryGender = "pet.gender = :gender";
    // const queryIsSeed = "pet.isSeed = :isSeed";
    // const queryPrice = "post.provisionalTotal < :provisionalTotal";
    const queryStatus = "post.status = :status";
    const queryType = "post.type = :type";
    // const queryAgeRangeFromTo =
    //   "pet.dob <= :ageRangeFrom and pet.dob >= :ageRangeTo";
    // const queryAgeRangeFrom = "pet.dob <= :ageRangeFrom";
    // const queryAgeRangeTo = "pet.dob >= :ageRangeTo";
    // const queryBreedPriceAgeRange = [
    //   queryBreedName,
    //   queryPrice,
    //   queryAgeRangeFromTo,
    // ];
    // const queryOption = [queryGender, queryIsSeed, queryStatus, queryType];
    // const queryAll = [
    //   queryBreedName,
    //   queryPrice,
    //   queryGender,
    //   queryIsSeed,
    //   queryStatus,
    //   queryType,
    //   queryAgeRangeFromTo,
    // ];

    // Query Builder inner join and select properties in table post, pet, breed and species
    let titleSearch = "";
    if (!pageOptionsDto.title) {
      titleSearch = "%%";
    } else {
      titleSearch = `%${pageOptionsDto.title.trim()}%`;
    }
    queryBuilder
      .innerJoinAndSelect("post.pet", "pet")
      .innerJoinAndSelect("post.medias", "medias")
      .innerJoinAndSelect("pet.breed", "breed")
      .innerJoinAndSelect("breed.species", "species");

    if (pageOptionsDto.notCustomerId) {
      if (pageOptionsDto.status) {
        queryBuilder.where(
          "post.customerId != :id and LOWER(post.title) LIKE LOWER(:title) " +
            AND +
            queryStatus,
          {
            id: pageOptionsDto.notCustomerId,
            title: titleSearch,
            status: pageOptionsDto.status,
          },
        );
      } else if (pageOptionsDto.type) {
        queryBuilder.where(
          "post.customerId != :id and LOWER(post.title) LIKE LOWER(:title) " +
            AND +
            queryType,
          {
            id: pageOptionsDto.notCustomerId,
            title: titleSearch,
            type: pageOptionsDto.type,
          },
        );
      } else {
        queryBuilder.where(
          "post.customerId != :id and LOWER(post.title) LIKE LOWER(:title) ",
          {
            id: pageOptionsDto.notCustomerId,
            title: titleSearch,
          },
        );
      }
    } else if (pageOptionsDto.customerId) {
      if (pageOptionsDto.status) {
        queryBuilder.where(
          "post.customerId = :id and LOWER(post.title) LIKE LOWER(:title) " +
            AND +
            queryStatus,
          {
            id: pageOptionsDto.customerId,
            title: titleSearch,
            status: pageOptionsDto.status,
          },
        );
      } else if (pageOptionsDto.type) {
        queryBuilder.where(
          "post.customerId = :id and LOWER(post.title) LIKE LOWER(:title) " +
            AND +
            queryType,
          {
            id: pageOptionsDto.customerId,
            title: titleSearch,
            type: pageOptionsDto.type,
          },
        );
      } else {
        queryBuilder.where(
          "post.customerId = :id and LOWER(post.title) LIKE LOWER(:title) ",
          {
            id: pageOptionsDto.customerId,
            title: titleSearch,
          },
        );
      }
    } else if (pageOptionsDto.status) {
      queryBuilder.where(
        queryStatus + AND + " LOWER(post.title) LIKE LOWER(:title) ",
        {
          status: pageOptionsDto.status,
          title: titleSearch,
        },
      );
    } else if (pageOptionsDto.type) {
      queryBuilder.where(
        queryType + AND + " LOWER(post.title) LIKE LOWER(:title) ",
        {
          type: pageOptionsDto.type,
          title: titleSearch,
        },
      );
    }

    // Sort createTime, transactionTotal
    if (checkOrderName == "createTime") {
      queryBuilder.orderBy("post.createTime", pageOptionsDto.orderType);
    } else {
      queryBuilder.orderBy("post.transactionTotal", pageOptionsDto.orderType);
    }

    // queryBuilder
    //   .innerJoinAndSelect("post.pet", "pet")
    //   .innerJoinAndSelect("post.medias", "medias")
    //   .innerJoinAndSelect("pet.breed", "breed")
    //   .innerJoinAndSelect("breed.species", "species");

    // if (checkOrderName == "name") {
    //   queryBuilder.orderBy("breed.name", pageOptionsDto.orderType);
    // } else if (checkOrderName == "createTime") {
    //   queryBuilder.orderBy("post.createTime", pageOptionsDto.orderType);
    // } else {
    //   queryBuilder.orderBy("post.provisionalTotal", pageOptionsDto.orderType);
    // }

    // // check all properties
    // if (checkAll) {
    //   queryBuilder.where(queryAll.join(AND), {
    //     name: "%" + pageOptionsDto.breedName + "%",
    //     isSeed: pageOptionsDto.isSeed,
    //     gender: pageOptionsDto.gender,
    //     provisionalTotal: pageOptionsDto.price,
    //     status: pageOptionsDto.status,
    //     type: pageOptionsDto.type,
    //     ageRangeFrom: dateFrom,
    //     ageRangeTo: dateTo,
    //   });
    // }
    // // check option with each ageRangeFrom, ageRangeTo, breedName, price
    // else if (
    //   checkOption &&
    //   checkAgeRangeFrom &&
    //   checkAgeRangeTo &&
    //   checkPrice
    // ) {
    //   queryBuilder.where(
    //     queryPrice + AND + queryAgeRangeFromTo + AND + queryOption.join(AND),
    //     {
    //       provisionalTotal: pageOptionsDto.price,
    //       isSeed: pageOptionsDto.isSeed,
    //       gender: pageOptionsDto.gender,
    //       status: pageOptionsDto.status,
    //       type: pageOptionsDto.type,
    //       ageRangeFrom: dateFrom,
    //       ageRangeTo: dateTo,
    //     },
    //   );
    // } else if (
    //   checkOption &&
    //   checkAgeRangeFrom &&
    //   checkAgeRangeTo &&
    //   checkBreedName
    // ) {
    //   queryBuilder.where(
    //     queryBreedName +
    //       AND +
    //       queryAgeRangeFromTo +
    //       AND +
    //       queryOption.join(AND),
    //     {
    //       name: "%" + pageOptionsDto.breedName + "%",
    //       isSeed: pageOptionsDto.isSeed,
    //       gender: pageOptionsDto.gender,
    //       status: pageOptionsDto.status,
    //       type: pageOptionsDto.type,
    //       ageRangeFrom: dateFrom,
    //       ageRangeTo: dateTo,
    //     },
    //   );
    // }
    // // checkOptipn with (ageRangeForm and ageRangeTo) and  price, breedName vs (ageRangeForm or ageRangeTo),
    // // check price vs ageRangeForm or ageRangeTo
    // else if (
    //   (checkOption && checkPrice && checkAgeRangeTo) ||
    //   (checkOption && checkPrice && checkAgeRangeFrom)
    // ) {
    //   if (checkAgeRangeTo) {
    //     queryBuilder.where(
    //       queryAgeRangeTo + AND + queryPrice + AND + queryOption.join(AND),
    //       {
    //         isSeed: pageOptionsDto.isSeed,
    //         gender: pageOptionsDto.gender,
    //         status: pageOptionsDto.status,
    //         type: pageOptionsDto.type,
    //         ageRangeTo: dateTo,
    //         provisionalTotal: pageOptionsDto.price,
    //       },
    //     );
    //   } else if (checkAgeRangeFrom) {
    //     queryBuilder.where(
    //       queryAgeRangeFrom + AND + queryPrice + AND + queryOption.join(AND),
    //       {
    //         isSeed: pageOptionsDto.isSeed,
    //         gender: pageOptionsDto.gender,
    //         status: pageOptionsDto.status,
    //         type: pageOptionsDto.type,
    //         ageRangeFrom: dateFrom,
    //         provisionalTotal: pageOptionsDto.price,
    //       },
    //     );
    //   }
    // }
    // // check breedName vs ageRangeForm or ageRangeTo
    // else if (
    //   (checkOption && checkBreedName && checkAgeRangeTo) ||
    //   (checkOption && checkBreedName && checkAgeRangeFrom)
    // ) {
    //   if (checkAgeRangeTo) {
    //     queryBuilder.where(
    //       queryAgeRangeTo + AND + queryBreedName + AND + queryOption.join(AND),
    //       {
    //         isSeed: pageOptionsDto.isSeed,
    //         gender: pageOptionsDto.gender,
    //         status: pageOptionsDto.status,
    //         type: pageOptionsDto.type,
    //         ageRangeTo: dateTo,
    //         name: "%" + pageOptionsDto.breedName + "%",
    //       },
    //     );
    //   } else if (checkAgeRangeFrom) {
    //     queryBuilder.where(
    //       queryAgeRangeFrom +
    //         AND +
    //         queryBreedName +
    //         AND +
    //         queryOption.join(AND),
    //       {
    //         isSeed: pageOptionsDto.isSeed,
    //         gender: pageOptionsDto.gender,
    //         status: pageOptionsDto.status,
    //         type: pageOptionsDto.type,
    //         ageRangeFrom: dateFrom,
    //         name: "%" + pageOptionsDto.breedName + "%",
    //       },
    //     );
    //   }
    // }
    // // check AgeRangeFrom && AgeRangeTo
    // else if (checkOption && checkAgeRangeFrom && checkAgeRangeTo) {
    //   queryBuilder.where(queryAgeRangeFromTo + AND + queryOption.join(AND), {
    //     isSeed: pageOptionsDto.isSeed,
    //     gender: pageOptionsDto.gender,
    //     status: pageOptionsDto.status,
    //     type: pageOptionsDto.type,
    //     ageRangeFrom: dateFrom,
    //     ageRangeTo: dateTo,
    //   });
    // } else if (checkOption && checkAgeRangeFrom) {
    //   queryBuilder.where(queryAgeRangeFrom + AND + queryOption.join(AND), {
    //     isSeed: pageOptionsDto.isSeed,
    //     gender: pageOptionsDto.gender,
    //     status: pageOptionsDto.status,
    //     type: pageOptionsDto.type,
    //     ageRangeFrom: dateFrom,
    //   });
    // } else if (checkOption && checkAgeRangeTo) {
    //   queryBuilder.where(queryAgeRangeTo + AND + queryOption.join(AND), {
    //     isSeed: pageOptionsDto.isSeed,
    //     gender: pageOptionsDto.gender,
    //     status: pageOptionsDto.status,
    //     type: pageOptionsDto.type,
    //     ageRangeTo: dateTo,
    //   });
    // }
    // // End check ageRange
    // else if (checkOption && checkBreedName) {
    //   queryBuilder.where(queryBreedName + AND + queryOption.join(AND), {
    //     name: "%" + pageOptionsDto.breedName + "%",
    //     isSeed: pageOptionsDto.isSeed,
    //     gender: pageOptionsDto.gender,
    //     status: pageOptionsDto.status,
    //     type: pageOptionsDto.type,
    //   });
    // } else if (checkOption && checkPrice) {
    //   queryBuilder.where(queryPrice + AND + queryOption.join(AND), {
    //     provisionalTotal: pageOptionsDto.price,
    //     isSeed: pageOptionsDto.isSeed,
    //     gender: pageOptionsDto.gender,
    //     status: pageOptionsDto.status,
    //     type: pageOptionsDto.type,
    //   });
    // }
    // // check each properties
    // else if (checkOrField) {
    //   if (checkStatus && checkBreedName && checkPrice) {
    //   } else if (checkBreedName && checkPrice) {
    //     queryBuilder.where(queryBreedName + AND + queryPrice, {
    //       name: "%" + pageOptionsDto.breedName + "%",
    //       provisionalTotal: pageOptionsDto.price,
    //     });
    //   } else if (checkBreedName) {
    //     queryBuilder.where(queryBreedName, {
    //       name: "%" + pageOptionsDto.breedName + "%",
    //     });
    //   } else if (checkGender) {
    //     queryBuilder.where(queryGender, { gender: pageOptionsDto.gender });
    //   } else if (checkIsSeed) {
    //     queryBuilder.where(queryIsSeed, { isSeed: pageOptionsDto.isSeed });
    //   } else if (checkPrice) {
    //     queryBuilder.where(queryPrice, {
    //       provisionalTotal: pageOptionsDto.price,
    //     });
    //   } else if (checkType) {
    //     queryBuilder.where(queryType, { type: pageOptionsDto.type });
    //   } else if (checkStatus) {
    //     queryBuilder.where(queryStatus, { status: pageOptionsDto.status });
    //   } else if (checkAgeRangeFrom && checkAgeRangeTo) {
    //     queryBuilder.where(queryAgeRangeFromTo, {
    //       ageRangeFrom: dateFrom,
    //       ageRangeTo: dateTo,
    //     });
    //   } else if (checkAgeRangeFrom) {
    //     queryBuilder.where(queryAgeRangeFrom, {
    //       ageRangeFrom: dateFrom,
    //     });
    //   } else if (checkAgeRangeTo) {
    //     queryBuilder.where(queryAgeRangeTo, {
    //       ageRangeTo: dateTo,
    //     });
    //   }
    // }
    // // check all field input null
    // else if (
    //   !checkBreedName &&
    //   !checkPrice &&
    //   !checkAgeRangeFrom &&
    //   !checkAgeRangeTo
    // ) {
    //   if (checkOption) {
    //     queryBuilder.where(queryOption.join(AND), {
    //       isSeed: pageOptionsDto.isSeed,
    //       gender: pageOptionsDto.gender,
    //       status: pageOptionsDto.status,
    //       type: pageOptionsDto.type,
    //     });
    //   }
    // }
    // // check null checkGender || checkStatus || checkType
    // else if (!checkGender || !checkStatus || !checkType) {
    //   // If not GENDER, will have both male and female
    //   if (checkStatus && checkType && checkBreedPriceAgeRange) {
    //     queryBuilder.where(
    //       queryStatus +
    //         AND +
    //         queryType +
    //         AND +
    //         queryBreedPriceAgeRange.join(AND),
    //       {
    //         name: "%" + pageOptionsDto.breedName + "%",
    //         provisionalTotal: pageOptionsDto.price,
    //         status: pageOptionsDto.status,
    //         type: pageOptionsDto.type,
    //         ageRangeFrom: dateFrom,
    //         ageRangeTo: dateTo,
    //       },
    //     );
    //   } else if (checkStatus && checkType) {
    //     queryBuilder.where(queryStatus + AND + queryType, {
    //       status: pageOptionsDto.status,
    //       type: pageOptionsDto.type,
    //     });
    //   }
    //   // If not TYPE, will have both breed and purchase
    //   else if (checkStatus && checkGender && checkBreedPriceAgeRange) {
    //     queryBuilder.where(
    //       queryStatus +
    //         AND +
    //         queryGender +
    //         AND +
    //         queryBreedPriceAgeRange.join(AND),
    //       {
    //         name: "%" + pageOptionsDto.breedName + "%",
    //         provisionalTotal: pageOptionsDto.price,
    //         ageRangeFrom: dateFrom,
    //         ageRangeTo: dateTo,
    //         status: pageOptionsDto.status,
    //         gender: pageOptionsDto.gender,
    //       },
    //     );
    //   } else if (checkStatus && checkGender) {
    //     queryBuilder.where(queryStatus + AND + queryGender, {
    //       status: pageOptionsDto.status,
    //       gender: pageOptionsDto.gender,
    //     });
    //   }
    //   // if not STATUS , will have REQUESTED, REJECTED,  PUBLISHED, WAITING_FOR_PAYMENT, CANCELED
    //   else if (checkType && checkGender && checkBreedPriceAgeRange) {
    //     queryBuilder.where(
    //       queryType +
    //         AND +
    //         queryGender +
    //         AND +
    //         queryBreedPriceAgeRange.join(AND),
    //       {
    //         name: "%" + pageOptionsDto.breedName + "%",
    //         provisionalTotal: pageOptionsDto.price,
    //         ageRangeFrom: dateFrom,
    //         ageRangeTo: dateTo,
    //         type: pageOptionsDto.type,
    //         gender: pageOptionsDto.gender,
    //       },
    //     );
    //   } else if (checkType && checkGender) {
    //     queryBuilder.where(queryType + AND + queryGender, {
    //       type: pageOptionsDto.type,
    //       gender: pageOptionsDto.gender,
    //     });
    //   }
    // }
    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
