import { IIdGenerator } from "../../application/interfaces/service/cryptoIdGeneratorInterface";

export class IdGnerator implements IIdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
