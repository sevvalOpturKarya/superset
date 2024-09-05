/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import emotionStyled from '@emotion/styled';
import { useTheme as useThemeBasic } from '@emotion/react';
import createCache from '@emotion/cache';

export {
  css,
  keyframes,
  jsx,
  ThemeProvider,
  CacheProvider as EmotionCacheProvider,
  withTheme,
} from '@emotion/react';
export { default as createEmotionCache } from '@emotion/cache';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SupersetTheme {}
}

export function useTheme() {
  const theme = useThemeBasic();
  // in the case there is no theme, useTheme returns an empty object
  if (Object.keys(theme).length === 0 && theme.constructor === Object) {
    throw new Error(
      'useTheme() could not find a ThemeContext. The <ThemeProvider/> component is likely missing from the app.',
    );
  }
  return theme;
}

export const emotionCache = createCache({
  key: 'superset',
});

export const styled = emotionStyled;

const defaultTheme = {
  borderRadius: 4,
  colors: {
    text: {
      label: '#879399',
      help: '#737373',
      textColor900: '#0A0D14',
      textSub500: '#525866',
      textSoft400: '#868C98',
      textDisabled300: '#CDD0D5',
      textWhite0: '#FFFFFF',
    },
    background: {
      bgStrong900: '#FEE5F7',
      bgSurface700: '#21232D',
      bgSoft200: '#E2E4E8',
      bgWeak100: '#F6F8FA',
      bgWhite0: '#FFFFFF',
    },
    stroke: {
      strokeStrong900: '#0A0D14',
      strokeSub300: '#CDD0D5',
      strokeSoft200: '#E2E4E9',
      strokeDisab100: '#F6F8FA',
      strokeWhite0: '#FFFFFF',
    },
    icon: {
      iconStrong900: '#0A0D14',
      iconSub500: '#525866',
      iconSoft400: '#868C98',
      iconDisab300: '#CDD0D5',
      iconWhite0: '#FFFFFF',
    },
    primary: {
      base: '#F800B5',
      dark: '#AD007E',
      darker: '#7C005A',
      light: '#FDCCF0',
      lighter: '#FEE5F7',
      dark1: '#AD007E',
      dark2: '#7C005A',
      light1: '#FB7FDA',
      light2: '#FC99E1',
      light3: '#FCB2E8',
      light4: '#FDCCF0',
      light5: '#FEE5F7',
    },
    primaryWhite:{
      light1: '#FEE5F7',
      light2: '#FDCCF0',
      light3: '#FCB2E8',
      light4: '#FC99E1',
      light5: '#FB7FDA',
      light6: '#FA66D2',
      light7: '#FA4CCB',
      light8: '#F932C3',
      light9: '#F819BC',
    },
    primaryDark:{
      dark1: '#DF00A2',
      dark2: '#C60090',
      dark3: '#AD007E',
      dark4: '#94006C',
      dark5: '#7C005A',
      dark6: '#630048',
      dark7: '#4A0036',
      dark8: '#310024',
      dark9: '#180012',
    },
    secondary: {
      base: '#444E7C',
      dark1: '#363E63',
      dark2: '#282E4A',
      dark3: '#1B1F31',
      light1: '#8E94B0',
      light2: '#B4B8CA',
      light3: '#D9DBE4',
      light4: '#ECEEF2',
      light5: '#F5F5F8',
    },
    grayscale: {
      base: '#666666',
      dark1: '#323232',
      dark2: '#000000',
      light1: '#B2B2B2',
      light2: '#E0E0E0',
      light3: '#F0F0F0',
      light4: '#F7F7F7',
      light5: '#FFFFFF',
    },
    error: {
      base: '#DF1C41',
      dark: '#AF1D38',
      darker: '#710E21',
      light: '#F9C9D2',
      lighter: '#FDEDF0',
    },
    warning: {
      base: '#F17B2C',
      dark: '#C2540A',
      darker: '#6E330C',
      light: '#FFDAC2',
      lighter: '#FEF3EB',
    },
    alert: {
      base: '#FCC700',
      dark1: '#BC9501',
      dark2: '#7D6300',
      light1: '#FDE380',
      light2: '#FEF9E6',
    },
    success: {
      base: '#38C793',
      dark: '#2D9F75',
      darker: '#176448',
      light: '#CBF5E5',
      lighter: '#EFFAF6',
    },
    info: {
      base: '#375DFB',
      dark: '#253EA7',
      darker: '#162264',
      light: '#C2D6FF',
      lighter: '#EBF1FF',
    },
    away: {
      base: '#F2AE40',
      dark: '#B47818',
      darker: '#693D11',
      light: '#FBDFB1',
      lighter: '#FEF7EC',
    },
    feature: {
      base: '#6F3FF3',
      dark: '#5A36BF',
      darker: '#2B1664',
      light: '#6F3FF3',
      lighter: '#EDEBFF',
    },
    neutral: {
      blueBlack900: '#090827',
      blueBlack800: '#21203C',
      blueBlack700: '#3A3952',
      blueBlack600: '#525267',
      blueBlack500: '#6B6A7D',
      blueBlack400: '#848393',
      blueBlack300: '#9C9CA8',
      blueBlack200: '#B5B4BE',
      blueBlack100: '#CDCDD3',
    },
    state: {
      stateSuccess: '#38C793',
      stateWarning: '#F17B2C',
      stateError: '#DF1C41',
      stateInformation: '#375DFB',
      stateAway: '#F2AE40',
      stayFeature: '#6E3FF3',
      stateNeutral: '#868C98',
    }
  },
  opacity: {
    light: '10%',
    mediumLight: '35%',
    mediumHeavy: '60%',
    heavy: '80%',
  },
  typography: {
    families: {
      sansSerif: `'Inter', Helvetica, Arial`,
      serif: `Georgia, 'Times New Roman', Times, serif`,
      monospace: `'Fira Code', 'Courier New', monospace`,
    },
    weights: {
      light: 200,
      normal: 400,
      medium: 500,
      bold: 600,
    },
    sizes: {
      xxs: 10,
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 24,
      xxl: 28,
    },
  },
  zIndex: {
    aboveDashboardCharts: 10,
    dropdown: 11,
    max: 3000,
  },
  transitionTiming: 0.3,
  gridUnit: 4,
  brandIconMaxWidth: 37,
};

export type SupersetTheme = typeof defaultTheme;

export interface SupersetThemeProps {
  theme: SupersetTheme;
}

export const supersetTheme = defaultTheme;
