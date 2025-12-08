import { randomBytes } from "crypto";
import { IPasswordGenerator } from "../../application/interfaces/service/passwordGenerator";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

export class PasswordGenerator implements IPasswordGenerator {
  async generate(): Promise<string> {
    const length = 8;
    const charset = LOWER + UPPER + DIGITS;
    const bytes = randomBytes(length);
    let out = "";

    for (let i = 0; i < length; i++) {
      const index = bytes[i] % charset.length;
      out += charset.charAt(index);
    }
    return out;
  }
}
