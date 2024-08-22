import { directoriesRepository, DirectoryEntity } from '@/entities/directories'
import { ROOT_ROOT_ID } from '@/entities/file-system-items'
import { createStore } from '@oleksii-pavlov/desirable/react'
import { Nullable } from '@/shared/types/nullable'
import { Id } from '@/shared/types/id'

export interface ContextDirectoryState {
  directory: Nullable<DirectoryEntity>
}

const initialState: ContextDirectoryState = {
  directory: null
}

export const contextDirectoryStore = createStore(initialState, (state) => ({
  updateDirectory: (directory: Nullable<DirectoryEntity>) => state.directory = directory,
  revalidate: async (id: Id) => {
    if (id === ROOT_ROOT_ID) return state.directory = null

    return directoriesRepository.getById(id)  
      .then(directory => state.directory = directory)
      .catch(() => state.directory = null)
  } 
}))

export const useContextDirectoryStore = contextDirectoryStore.useSelector
export const { revalidate, updateDirectory } = contextDirectoryStore.reducers
