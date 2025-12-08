export interface IPasswordGenerator {
  generate(): Promise<string>;
}
