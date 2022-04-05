export interface IWrite<T> {
  insert(item: Partial<T>): Promise<T>
  update(id: string, item: Partial<T>): Promise<T | null>
  delete(id: string): Promise<boolean>
}