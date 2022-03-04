import { getStorage } from "firebase-admin/storage";
import { configService } from "src/config/config.service";
import { v4 } from "uuid";

export class UploadFileService {
  async uploadFile(file: Express.Multer.File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const BUCKET = configService.getBucket();
      const uuidKey = v4();
      const firebaseStorage = getStorage();
      const writer = firebaseStorage
        .bucket()
        .file(`${uuidKey}-${file.originalname}`)
        .createWriteStream({
          contentType: "image/jpeg",
          metadata: {
            contentType: "image/jpeg",
            metadata: {
              firebaseStorageDownloadTokens: uuidKey,
            },
          },
        });
      writer.on("error", () => {
        reject();
      });
      writer.on("finish", () => {
        resolve(
          "https://firebasestorage.googleapis.com/v0/b/" +
            BUCKET +
            "/o/" +
            encodeURIComponent(`${uuidKey}-${file.originalname}`) +
            "?alt=media&token=" +
            uuidKey,
        );
      });
      writer.end(file.buffer);
    });
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
      throw Error("Cannot remove file");
    }
  }

  private getFileName(path: string): string {
    const subPath: string[] = path.split("?")[0].split("/");
    return subPath[subPath.length - 1];
  }
}

const uploadService = new UploadFileService();

export { uploadService };
