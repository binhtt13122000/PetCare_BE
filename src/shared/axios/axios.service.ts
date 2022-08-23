import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ChainData } from "src/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async getHistory(id: string): Promise<{ key: string; value: ChainData[] }> {
    try {
      const response = await lastValueFrom(
        this.httpService.get("/api/getHistory/" + id),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async setData<T>(
    data: T,
    type: string,
    content: string,
    no: string,
  ): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post("/api/setData", {
          no: no,
          content: {
            current: data,
            write: content,
          },
          type: type,
          date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
        }),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async remove(specialMarking: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpService.get("/api/delAsset/" + specialMarking),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async clone<T>(
    content: T,
    type: string,
    no: string,
    date: Date,
  ): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post("/api/setData", {
          no: no,
          content: {
            ...content,
          },
          type: type,
          date: date,
        }),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
