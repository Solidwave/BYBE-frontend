import { Button, Menu, Popover, Popper, Slider, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Column, ColumnType } from '../../../types/Column'
import usePrevious from '../../../app/hooks'

type Props = {
    onChange?: Function,
    column?: Column
}

const SliderHeader = ({ onChange, column }: Props) =>  {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState<number[]>([column.min, column.max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const preOpen = usePrevious(open)

    useEffect(() => {
        if (preOpen && !open) {
            onChange(column.value + '_filter', `min_${value[0]}_max_${value[1]}`)
        }
    },[open])

    return (
        <div>
            <TextField InputLabelProps={{shrink: !open}} InputProps={{readOnly: true}} value={!open ? String(value[0]) + ' - ' + String(value[1]) : ''} variant='filled' label={column.label} fullWidth onClick={handleClick} ></TextField>
            <Popover sx={{
                minWidth: '300px',
                display: 'flex'
            }} anchorOrigin={{
                vertical: 'bottom',
                horizontal:'left'
            }} open={open} onClose={handleClose} anchorEl={anchorEl}>
                <div style={{
                    display: 'flex',
                    padding: '.5rem .5rem',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        marginRight: '1rem',
                        textAlign: 'center',
                        minWidth: '2rem'
                    }}>{value[0]}</Typography>
                    <Slider
                        sx={{
                            minWidth: '200px',
                        }}
                        max={column.max}
                        min={column.min}
                        value={value}
                        onChange={handleChange}
                    />
                    <Typography sx={{
                        marginLeft: '1rem',
                        minWidth: '2rem',
                        textAlign: 'center'
                    }}>{value[1]}</Typography>
                </div>
            </Popover>
        </div >
    )
}

export default SliderHeader