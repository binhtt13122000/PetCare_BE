// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import authConfig from "src/config/auth.config";

// export class JwtStrategy extends PassportStrategy<Strategy> {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: authConfig().jwtSecretKey,
//     });
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   async validate(payload: any): Promise<any> {
//     return payload;
//   }
// }
