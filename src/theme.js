import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import muiRed from '@material-ui/core/colors/red';

export const blueLightest = '#fdfdfe';
export const blueLighter = '#F2F6F8';
export const blueLight = '#7EAABF';
export const blue = '#00649F';
export const yellow = '#FACA3A';
export const orange = '#F29400';
export const red = muiRed[500];
export const gray = '#58585A';
export const lightGray = '#E1E1E1';
export const white = '#fff';
export const lightGreen = 'rgba(151,147,0,0.3)';
export const green = 'rgba(188,191,0,0.7)';
export const darkGreen = '#979300';

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue,
            text: {
                primary: gray,
            },
        },
        secondary: {
            main: orange,
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'bree',
        fontSize: 18,
    },
    overrides: {
        MuiFormLabel: {
            root: {
                zIndex: 1,
                lineHeight: '24px',
                fontSize: '1rem',
                color: gray,
                '&$focused': {
                    color: gray,
                },
            },
            asterisk: {
                display: 'none',
            },
        },
        MuiMenuItem: {
            root: {
                fontSize: '1rem',
            },
        },
        MuiButton: {
            root: {
                borderRadius: 40,
                height: 40,
                minWidth: 140,
                padding: 0,
            },
            contained: {
                '&$disabled': {
                    backgroundColor: '#e1e1e1',
                    color: '#fff',
                },
            },
            outlined: {
                '&$disabled': {
                    backgroundColor: '#e1e1e1',
                    color: '#fff',
                },
                borderColor: blue,
                boxSizing: 'content-box',
                maxWidth: 150,
                height: 40,
                paddingLeft: 0,
                paddingRight: 0,
            },
            label: {
                fontWeight: 600,
                fontSize: '1rem',
                fontFamily: 'Myriad Pro',
                lineHeight: '43px',
            },
        },
        MuiInput: {
            root: {
                outline: 'none',
                background: '#f3f3f3',
                border: '0.5px solid #979797',
                color: gray,
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: '24px',
            },
            underline: {
                '&:after': {
                    borderBottomColor: blue,
                    borderBottomWidth: 5,
                },
            },
            input: {
                fontSize: '1rem',
                padding: '10px 22px',
            },
        },
        MuiSnackbarContent: {
            root: {
                [defaultTheme.breakpoints.up('md')]: {
                    maxWidth: 'inherit',
                },
            },
        },
        MuiRadio: {
            root: {
                '& svg': {
                    fill: lightGray,
                },
            },
            checked: {
                '& svg': {
                    fill: orange,
                },
            },
        },
        MuiTypography: {
            body1: {
                color: gray,
            },
        },
    },
});
