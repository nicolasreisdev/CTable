import 'styled-components';
import { defaultTheme } from './styles/themes/default';

// typeof extrai a tipagem do objeto defaultTheme
type ThemeType = typeof defaultTheme;

// Agora, estendemos a interface DefaultTheme do styled-components
// com a nossa própria tipagem
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}