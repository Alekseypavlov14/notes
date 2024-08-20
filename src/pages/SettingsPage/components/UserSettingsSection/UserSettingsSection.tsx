import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { updateShowItemsLength, useSettingsStore } from '@/features/settings'
import { Space, Switch } from 'antd'
import { Headline } from '@/shared/components/Headline'
import styles from './UserSettingsSection.module.css'

export function UserSettingsSection() {
  const settings = useSettingsStore(state => state)

  return (
    <SettingsSection className={styles.UserSettingsSection}>
      <SettingsSectionTitle>User settings</SettingsSectionTitle>

      <SettingsSectionContent>
        <Space direction='horizontal' size='middle'>
          <Switch 
            checked={settings.showItemsLength}
            onChange={updateShowItemsLength}
          />

          <Headline level={5} className={styles.Label}>
            Show folder items amount
          </Headline>
        </Space>
      </SettingsSectionContent>
    </SettingsSection>
  )
}