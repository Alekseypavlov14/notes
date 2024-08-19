import { defaultSettingsConfig } from '../constants'
import { SettingsConfig } from '../settings-config'

export function normalizeSettingsConfig(data: Partial<SettingsConfig> = {}): SettingsConfig {
  return ({
    showItemsLength: data.showItemsLength || defaultSettingsConfig.showItemsLength
  })
}
