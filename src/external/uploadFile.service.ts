import { getStorage } from "firebase-admin/storage";
import { configService } from "src/config/config.service";
import { v4 } from "uuid";

export class UploadFileService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ url: string | null; type: string }> {
    let contentType =
      file.mimetype.startsWith("image") &&
      "image/jpeg" &&
      "image/png" &&
      "image/jpg";
    contentType = file.mimetype.startsWith("video") && "video/mp4";
    return new Promise<{ url: string | null; type: string }>(
      (resolve, reject) => {
        const BUCKET = configService.getBucket();
        const uuidKey = v4();
        const firebaseStorage = getStorage();
        const writer = firebaseStorage
          .bucket()
          .file(`${uuidKey}-${file.originalname}`)
          .createWriteStream({
            contentType: contentType,
            metadata: {
              contentType: contentType,
              metadata: {
                firebaseStorageDownloadTokens: uuidKey,
              },
            },
          });
        writer.on("error", () => {
          reject();
        });
        writer.on("finish", () => {
          resolve({
            url:
              "https://firebasestorage.googleapis.com/v0/b/" +
              BUCKET +
              "/o/" +
              encodeURIComponent(`${uuidKey}-${file.originalname}`) +
              "?alt=media&token=" +
              uuidKey,
            type: contentType,
          });
        });
        writer.end(file.buffer);
      },
    );
  }

  async removeImage(path: string): Promise<unknown> {
    try {
      const firebaseStorage = getStorage();
      const bucket = firebaseStorage.bucket();
      const file = bucket.file(this.getFileName(path));
      if (await file.exists()) {
        const response = file.delete();
        return response;
      }
    } catch (ex) {
      throw Error(`Cannot remove file, ${ex}`);
    }
  }

  async removeImages(paths: string[]): Promise<unknown> {
    try {
      return Promise.all([
        paths?.map(async (path) => {
          await this.removeImage(path);
        }),
      ]);
    } catch (ex) {
      throw Error(`Cannot remove files, ${ex}`);
    }
  }

  private getFileName(path: string): string {
    const subPath: string[] = path.split("?")[0].split("/");
    return subPath[subPath.length - 1];
  }
}

const uploadService = new UploadFileService();

export { uploadService };
