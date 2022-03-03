import { getStorage } from "firebase-admin/storage";
import { configService } from "src/config/config.service";
import { v4 } from "uuid";

export class UploadFileService {
  async uploadFile(file: Express.Multer.File): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
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
        resolve(null);
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
}

const uploadService = new UploadFileService();

export { uploadService };
