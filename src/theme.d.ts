import { PaletteOptions, } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    export interface PaletteOptions {
        tertiary: {
            main: string,
            light: string,
            dark: string
        },
        mainAction: {
            hover: {
                background: string,
                border: string
            },
            standard: {
                background: string,
                border: string
            }
        }
    }

    export interface Palette {
        tertiary: {
            main: string,
            light: string,
            dark: string
        },
        mainAction?: {
            hover?: {
                background?: string,
                border?: string
            },
            standard?: {
                background?: string,
                border?: string
            }
        }
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        gradient: {
            main: string;
            secondary: string;
        };
        extraShadows: {
            panel: string,
            card: string
        }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        gradient?: {
            main?: string;
            secondary?: string;
        };
        extraShadows?: {
            panel?: string,
            card?: string
        }
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        action: true;
    }
}
declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        fantasy: true;
    }
}