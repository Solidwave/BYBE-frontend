import { styled } from "@mui/material"

type PanelProps = {
    border?: string,
    padding?: string,
    margin?: string,
    overflow?: string
}
const Panel = styled('div')<PanelProps>(
    (props) => ({
        border: props.border || '5px solid',
        background: ' linear-gradient(0deg, #882013, #882013), radial-gradient(50 % 50 % at 50 % 50 %, #E2BE87 0 %, #AA8B5B 100 %)',
        borderColor: props.theme.palette.secondary.main,
        borderRadius: '1rem',
        // backgroundImage: 'radial-gradient(50 % 50 % at 50 % 50 %, #E2BE87 0 %, #AA8B5B 100 %)',
        overflow: props.overflow,
        maxHeight: '600px',
        padding: props.padding,
        margin: props.margin
        

}))

export default Panel
