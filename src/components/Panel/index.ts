import { styled } from "@mui/material"

type PanelProps = {
    border?: string,
    padding?: string,
    margin?: string,
    minWidth?: string,
    minHeight?: string,
    overflow?: string,
    borderRadius?:string
}
const Panel = styled('div')<PanelProps>(
    (props) => ({
        border: props.border || '5px solid',
        borderColor: props.theme.palette.secondary.main,
        boxSizing: 'border-box',
        borderRadius: props.borderRadius ,
        // backgroundImage: 'radial-gradient(50 % 50 % at 50 % 50 %, #E2BE87 0 %, #AA8B5B 100 %)',
        overflow: props.overflow,
        minHeight: props.minHeight,
        minWidth: props.minWidth,
        padding: props.padding,
        margin: props.margin
        

}))

export default Panel
