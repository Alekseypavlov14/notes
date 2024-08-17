import { Id } from './id'

export interface Entity {
  id: Id 
  createdAt: number
  updatedAt: number
}

export type EntityDTO<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
