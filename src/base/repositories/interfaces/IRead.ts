export interface IRead<T> {
  find(item?: Partial<T>): Promise<T[]>;
  findOne(id: string | Partial<T>): Promise<T | null>;
}