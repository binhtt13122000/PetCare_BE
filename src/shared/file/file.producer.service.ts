import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue("file-operation-queue") private queue: Queue) {}

  async deleteFile(url: string): Promise<void> {
    await this.queue.add("delete-file-job", {
      url: url,
    });
  }

  async deleteFiles(urls: string[]): Promise<void> {
    await this.queue.add("delete-files-job", {
      urls: urls,
    });
  }
}
