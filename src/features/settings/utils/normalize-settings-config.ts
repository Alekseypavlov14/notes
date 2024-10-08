import { defaultSettingsConfig } from '../constants'
import { SettingsConfig } from '../settings-config'

export function normalizeSettingsConfig(data: Partial<SettingsConfig> = {}): SettingsConfig {
  return ({
    showItemsLength: data.showItemsLength ?? defaultSettingsConfig.showItemsLength,
    showDateTime: data.showDateTime ?? defaultSettingsConfig.showDateTime,
    showFileContentPreview: data.showFileContentPreview ?? defaultSettingsConfig.showFileContentPreview
  })
}
