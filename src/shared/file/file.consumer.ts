import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { uploadService } from "src/external/uploadFile.service";

@Processor("file-operation-queue")
export class FileConsumer {
  @Process("delete-file-job")
  async deleteFile(job: Job<{ url: string }>): Promise<void> {
    try {
      uploadService.removeImage(job.data.url);
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
    }
  }
}
