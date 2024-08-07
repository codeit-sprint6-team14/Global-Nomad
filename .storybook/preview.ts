import { withThemeByClassName } from '@storybook/addon-themes';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        sm: {
          name: 'SM (375px)',
          styles: {
            width: '375px',
            height: '100%',
          },
        },
        md: {
          name: 'MD (744px)',
          styles: {
            width: '744px',
            height: '100%',
          },
        },
        lg: {
          name: 'LG (1200px)',
          styles: {
            width: '1200px',
            height: '100%',
          },
        },
      },
      defaultViewport: 'responsive',
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        // nameOfTheme: 'classNameForTheme',
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
