import { DefaultTheme } from "@react-navigation/native";

const theme = {
    lightTheme: {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#4188DA',
            background: '#fff', //'#F8F9FF',
            onBackground: "#191C20",
            card: '#F8F9FF',
            text: '#191C20',
            border: "#D9D9D9",
            notification: "red",
            surface: '#F8F9FF',
            surfaceVariant: '#F8F9FF',
            onSurface: "#191C20",
            error: '#BA1A1A'
        },
        fonts: {
            ...DefaultTheme.fonts,
            default: {
                regular: {
                    fontFamily: "poppins_regular",
                    fontWeight: 'normal'
                },
                medium: {
                    fontFamily: "poppins_medium",
                    fontWeight: 'normal'
                },
                bold: {
                    fontFamily: 'poppins_semibold',
                    fontWeight: "600"
                },
                heavy: {
                    fontFamily: "poppins_bold",
                    fontWeight: "700"
                }
            }
        }
    },

    darkTheme: {
        ...DefaultTheme,
        dark: true,
        colors: {
            primary: '#4188DA',
            background: '#111111',
            onBackground: "#E1E2E9",
            card: "#1D2742",
            text: "#E1E2E9",
            border: '#D9D9D9',
            notification: "red",
            surface: '#1D2742',
            surfaceVariant: '#1D2742',
            onSurface: '#E1E2E9',
            error: '#BA1A1A'
        },
        fonts: {
            ...DefaultTheme.fonts,
            default: {
                regular: {
                    fontFamily: "poppins_regular",
                    fontWeight: 'normal',
                    color: 'red'
                },
                medium: {
                    fontFamily: "poppins_medium",
                    fontWeight: 'normal',
                    color: 'green'
                },
                bold: {
                    fontFamily: 'poppins_semibold',
                    fontWeight: "600",
                    color: 'green'
                },
                heavy: {
                    fontFamily: "poppins_bold",
                    fontWeight: "700",
                    color: 'yellow'
                }
            }
        }
    }
}

export default theme;