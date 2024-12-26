import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthUserService } from "../../application/user.service";
import { AuthSessionService } from "../../application/session.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly service: AuthUserService,
    private readonly serviceSession: AuthSessionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const session = await this.serviceSession.findByToken(token);

    if (!session) {
      throw new UnauthorizedException("Session not found");
    }
    const user = await this.service.findById(payload.sub);

    return {
      ...user,
      session
    };
  }
}
