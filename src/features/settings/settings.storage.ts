import { defaultSettingsConfig } from './constants'
import { SettingsConfig } from './settings-config'
import { LocalStorage } from '@oleksii-pavlov/storages'

export const settingsStorage = new LocalStorage<SettingsConfig>('settings', defaultSettingsConfig)
