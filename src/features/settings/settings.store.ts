import { normalizeSettingsConfig } from './utils/normalize-settings-config'
import { defaultSettingsConfig } from './constants'
import { settingsStorage } from './settings.storage'
import { SettingsConfig } from './settings-config'
import { createStore } from '@oleksii-pavlov/desirable/build/react'
import { deepMerge } from '@oleksii-pavlov/deep-merge'

const preloadedSettingsConfig = settingsStorage.getValue() ?? defaultSettingsConfig
const initialState: SettingsConfig = normalizeSettingsConfig(preloadedSettingsConfig)

export const settingsStore = createStore(initialState, (state) => ({
  updateSettings: (updateSettings: Partial<SettingsConfig>) => {
    state = deepMerge(state, updateSettings)
  }
}))

settingsStore.subscribe(state => {
  settingsStorage.setValue(normalizeSettingsConfig(state))
})

export const { updateSettings } = settingsStore.reducers
export const useSettingsStore = settingsStore.useSelector
