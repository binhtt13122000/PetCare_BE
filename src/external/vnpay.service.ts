import { configService } from "src/config/config.service";
import { format } from "date-fns";
import qs from "qs";
import crypto from "crypto";
import { Request } from "express";
export class VnPayService {
  generatePaymentUrl(
    vnp_TxnRef: string,
    returnUrl: string,
    amount: number,
    ipAddress: string,
    orderInfo: string,
    locale?: "en" | "vn",
    bankCode?: string,
    orderType?: string,
  ): string {
    const tmnCode = configService.getVnPayTmn();
    const secretKey = configService.getVnPayHashSecret();
    let vnpUrl = configService.getVnPayUrl();
    const date = new Date();

    const createDate = format(date, "yyyyMMddHHmmss");

    if (locale === undefined) {
      locale = "vn";
    }
    const currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = vnp_TxnRef;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddress;
    vnp_Params["vnp_CreateDate"] = createDate;
    // eslint-disable-next-line no-console
    console.log(createDate);
    if (bankCode !== undefined && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    if (orderType !== undefined && orderType !== "") {
      vnp_Params["vnp_OrderType"] = orderType;
    }

    vnp_Params = this.sortObject(vnp_Params);

    const signed = this.getSign(secretKey, vnp_Params);
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });
    return vnpUrl;
  }

  vnpayReturn(
    req: Request,
    callbackSuccess: () => void,
    callBackFail: () => void,
  ): void {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = this.sortObject(vnp_Params);
    const secretKey = configService.getVnPayHashSecret();
    const signed = this.getSign(secretKey, vnp_Params);

    if (secureHash === signed) {
      if (
        vnp_Params["vnp_ResponseCode"] === "00" &&
        vnp_Params["vnp_TransactionStatus"] === "00"
      ) {
        callbackSuccess();
      } else {
        callBackFail();
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("Error");
    }
  }

  private getSign(secretKey: string, vnp_Params: qs.ParsedQs): string {
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    return signed;
  }

  private sortObject(obj: qs.ParsedQs): qs.ParsedQs {
    const sorted = {};
    const str = [];
    let key: string;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (let i = 0; i < str.length; i++) {
      sorted[str[i]] = encodeURIComponent(obj[str[i]] as string).replace(
        /%20/g,
        "+",
      );
    }
    return sorted;
  }
}

const vnpayService = new VnPayService();

export { vnpayService };
