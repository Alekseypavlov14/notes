import { darkThemeToken, lightThemeToken, userPreferenceToken } from './constants'
import { getThemeByUserPreference } from './utils/get-theme-by-user-preference'
import { ThemeConfig, theme } from 'antd'
import { isLightTheme } from './utils/is-light-theme'
import { AliasToken } from 'antd/es/theme/internal'

const primaryColorVariants: Partial<AliasToken> = {
  colorPrimary: '#FFB200',
  colorFillSecondary: '#FFEEA9',
  colorLink: '#FFB200',
  colorBgTextActive: '#FFB200',
  colorBgTextHover: '#FFEEA9',
  colorFill: '#FFB200',
  colorHighlight: '#FFB200',
  colorInfoActive: '#FFB200',
  colorInfoHover: '#FFEEA9',
  colorLinkActive: '#FFB200',
  colorLinkHover: '#FFEEA9',
  colorPrimaryHover: '#FFEEA9',
  colorPrimaryText: '#FFB200',
  colorPrimaryTextHover: '#FFEEA9',
  colorPrimaryTextActive: '#FFB200',
}

export const lightThemeData: ThemeConfig = {
  token: {
    ...primaryColorVariants,

    colorBorder: '#dad8d8',

    colorBgContainer: '#ffffff',
    colorText: '#222224',
    colorTextPlaceholder: '#707070',
    colorBorderBg: '#dad8d8',

    colorSplit: '#dad8d8',

    colorBgElevated: '#ffffff',

    controlOutline: 'transparent',

    controlHeight: 36,
  },
  components: {
    Select: {
      optionActiveBg: '#e5e5e5',
      optionSelectedBg: '#e5e5e5',
    }
  },
}

export const darkThemeData: ThemeConfig = {
  algorithm: theme.darkAlgorithm,

  token: {
    ...primaryColorVariants,

    colorBorder: '#43403e',

    colorBgContainer: '#1d1d27',
    colorBorderBg: '#6b6a70',
    colorText: '#e9e8ea',
    colorTextPlaceholder: '#6b6a70',

    colorSplit: '#43403e',

    colorBgElevated: '#1d1d27',

    controlOutline: 'transparent',

    controlHeight: 36,
  },
  components: {
    Select: {
      optionActiveBg: '#282834',
      optionSelectedBg: '#282834',
    },
    DatePicker: {
      colorTextDisabled: '#6b6a70',
    },
  },
}

export const mapThemeTokenToThemeData = {
  [lightThemeToken]: () => lightThemeData,
  [darkThemeToken]: () => darkThemeData,
  [userPreferenceToken]: () => isLightTheme(getThemeByUserPreference()) ? lightThemeData : darkThemeData
}
