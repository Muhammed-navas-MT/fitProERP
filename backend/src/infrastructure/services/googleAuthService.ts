import { OAuth2Client } from "google-auth-library";
import { IGoogleAuthService } from "../../application/interfaces/service/googleAuthServiceInterface";

export class GoogleAuthService implements IGoogleAuthService {
  constructor(
    private _client: OAuth2Client,
    private _googleClientId: string,
  ) {}

  async verifyToken(token: string): Promise<{
    email: string;
    name?: string;
    picture?: string;
    emailVerified: boolean;
  }> {
    const ticket = await this._client.verifyIdToken({
      idToken: token,
      audience: this._googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error("Invalid Google token");
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified ?? false,
    };
  }
}
