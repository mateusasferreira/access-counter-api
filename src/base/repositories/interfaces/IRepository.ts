import { IRead } from './IRead'
import { IWrite } from './IWrite'

export type Repository<T> = IRead<T> & IWrite<T>