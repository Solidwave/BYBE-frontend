import { PaletteOptions, } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    export interface PaletteOptions {
        tertiary: {
            main: string,
            dark: string
        }
    }

    export interface Palette {
        tertiary: {
            main: string,
            dark: string
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