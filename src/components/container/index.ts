import { styled } from "@mui/material"

type ContainerProps = {
    width?: string,
    height?: string,
    margin?: string,
    padding?: string
}
const Container = styled('div')(
    (props: ContainerProps) => ({
        height: props.height || '100%',
        width: props.width || '100%',
        margin: props.margin,
        padding: props.padding
        
    }))

export default Container