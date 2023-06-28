import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: '#511E15',

        },
        secondary: {
            main: '#882013',
            dark: '#724534'
        },
        tertiary: {
            main: '#C1A57F',
            dark: '#9F765C',
            light: '#C09F6D'
        },
        mainAction: {
            hover: {
                background: 'radial-gradient(130.48% 138.54% at 50.33% 50%, #68390C 0%, #110D02 100%, #110D02 100%)',
                border: '4px solid #6C3805'
            },
            standard: {
                background: 'radial-gradient(130.48% 138.54% at 50.33% 50%, #FFD986 0%, #CE5E00 100%)',
                border: '4px solid #882013'
            }
        },
        badge: {
            trivial: '#97C05C',
            low: '#D1DA59',
            moderate: '#F7C144',
            severe: '#F29C38',
            extreme: '#ED6237'
        }
    },
    gradient: {
        main: 'radial-gradient(50% 50% at 50% 50%, #E2BE87 0%, #AA8B5B 100%)',
        secondary: 'radial-gradient(115.4% 115.4% at 50% 50%, #D6B37E 0%, #A48558 100%)'
    },
    extraShadows: {
        panel: '0px 0px 10px #000000, inset 0px 0px 4px #000000',
        card: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)'
    },
    components: {
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    backgroundColor: '#511E15',
                    color: '#E2BE87'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    background: '#E2BE87'
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper:{
                    background: '#E2BE87'
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: '#E2BE87'
                }
            }
          
        },
        MuiTypography: {
            styleOverrides: {
                paragraph: {
                    letterSpacing: 1
                },
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'action' },
                    style: {
                        color: '#7F4A22',
                        background: 'radial-gradient(130.48% 138.54% at 50.33% 50%, #FFD986 0%, #CE5E00 100%)',
                        border: '4px solid #882013',
                        borderRadius: 32,
                        fontWeight: 500,
                        fontSize: '.875rem',
                        lineHeight: '1.5rem',
                        ":hover": {
                            background: 'radial-gradient(130.48% 138.54% at 50.33% 50%, #68390C 0%, #110D02 100%, #110D02 100%)',
                            border: '4px solid #6C3805',
                            transition: 'all ease-in-out .5s',
                            color: '#DDC3A4',
                        }
                    }
                }
            ],

        },
        MuiIconButton: {
            defaultProps: {
            },
            variants: [{
                props: {},
                style: {
                    ':hover': {
                        color: '#511E15',
                        backgroundSize: 'small',

                        transition: 'all ease-in-out .3s',
                        '& MuiSvgIcon-root': {
                            fontSize: '2rem !important'
                        }
                    },

                }
            }
        ]
        },
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'fantasy' },
                    style: {
                        background: 'radial-gradient(50% 50% at 50% 50%, #E2BE87 0%, #AA8B5B 100%)',
                        borderRadius: 32
                    }
                }
            ]
        }
    }
})

export default theme