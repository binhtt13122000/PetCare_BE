import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { configService } from "src/config/config.service";
import { AuthPayloadDTO, ConvertAuthPayloadDTO } from "../auth.dto";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getValue("JWT_SECRET_KEY"),
    });
  }

  validate(payload: AuthPayloadDTO): ConvertAuthPayloadDTO {
    return { userId: payload.sub, phoneNumber: payload.phoneNumber };
  }
}
