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