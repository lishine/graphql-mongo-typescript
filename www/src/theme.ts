import { theme as defaultTheme } from '@chakra-ui/core'

export const theme = {
    ...defaultTheme,
    radii: { ...defaultTheme.radii, xl: '1rem', xxl: '2rem' },
    fonts: {
        ...defaultTheme.fonts,
        body:
            '"Ubuntu",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        heading:
            '"Ubuntu",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
    colors: {
        ...defaultTheme.colors,
        grayButton: {
            '50': '#F7FAFC',
            '100': '#EDF2F7',
            '200': '#E2E8F0',
            '500': '#cccccc',
            '600': '#bbbbbb',
            '700': '#aaaaaa',
            '650': '#4A5568',
            '750': '#2D3748',
            '800': '#1A202C',
            '900': '#171923',
        },
    },
    breakpoints: ['1000px'],
}

let { icons, ...printTheme } = theme

// console.log(JSON.stringify(printTheme, null, 2))
