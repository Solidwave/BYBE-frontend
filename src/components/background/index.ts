import { styled } from "@mui/material"


const Background = styled('div')((props) => ({
    backgroundColor: props.theme.palette.tertiary?.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    height: '100%',
    padding: '5rem 18rem'
    // overflow: 'hidden'
}),
)

export default Background