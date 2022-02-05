import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    softTextColor: string;
    evenBgColor: string;
    borderColor: string;
    thickBorderColor: string;
    accentColor: string;
    chapterBgColor: string;
  }
}
