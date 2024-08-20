import { SettingsSection, SettingsSectionContent, SettingsSectionTitle } from '@/widgets/SettingsSection'
import { updateShowDateTime, updateShowItemsLength, useSettingsStore } from '@/features/settings'
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

        <Space direction='horizontal' size='middle'>
          <Switch 
            checked={settings.showDateTime}
            onChange={updateShowDateTime}
          />

          <Headline level={5} className={styles.Label}>
            Show files and folders last updated time
          </Headline>
        </Space>
      </SettingsSectionContent>
    </SettingsSection>
  )
}