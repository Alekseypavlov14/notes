import { validationCacheStorage } from './validations.cache'
import { credentialsStorage } from './credentials'

export function signOut() {
  validationCacheStorage.removeValue()
  credentialsStorage.removeValue()
}