import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material"
import { useGetCreaturesListQuery, useGetFamiliesListQuery } from "../../services/creatures"
import { Clear } from "@mui/icons-material"
import { Creature } from "../../types/creature"
import { useState } from "react"
import Container from "../container"
import SearchButton from "./SearchButton"
import { Column } from "../../types/column"
import TableHeader from "./TableHeader"
type StateType = {
    hideColumns: string[]
}

type Props = {
    updateEncounter: Function
}


type ColumnsType = Column[]

const columns: ColumnsType = [
    {
        value: 'name',
        label: '',
        type: 'empty',
        maxWidth: '20px'
    },
    {
        value: 'name',
        label: 'Name',  
        type: 'input'
    },
    {
        value: 'level',
        label: 'Level',
        type: 'double',
        minWidth: 150,
        subColumns: [
            {
                value: 'level',
                label: 'Min lvl',
                type: 'input'
            },
            {
                value: 'level',
                label: 'Max lvl',
                type: 'input'
            },
        ]

    },
    {
        value: 'hp',
        label: 'Hp',
        type: 'input'

    },
    {
        value: 'family',
        label: 'Family',
        type: 'select',
        options: 'families'
    },
    {
        value: 'alignment',
        label: 'Alignment',
        type: 'input'

    },
    {
        value: 'size',
        label: 'Size',
        type: 'input'


    },
    {
        value: 'rarity',
        label: 'Rarity',
        type: 'input'

    }
]

const BasicTable = (props: Props) => {
    const data = useGetCreaturesListQuery('')

    const options = {
        families: useGetFamiliesListQuery('').data?.map(family => ({
            label: family,
            value: family
        }))
    }

    const theme = useTheme()

    const [state, setState] = useState<StateType>({
        hideColumns: []
    })

    if (data.isLoading) {
        return (
            <CircularProgress></CircularProgress>
        )
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setState(
            { ...state, hideColumns: typeof value === 'string' ? value.split(',') : value }
        );
    };

    const handleClearClick = () => {
        setState(
            { ...state, hideColumns: []}
        );
    };

    const getRandomEncounter = (count: number) => {
        if (!data?.data?.results) return []

        const list = []

        for (let index = 0; index < count; index++) {
            list.push(data?.data?.results[Math.floor(Math.random() * data?.data?.results?.length)])
        }
       
        return list
    }

    const isColumnVisible = (type: string) => {
        console.log(state.hideColumns.includes(type), state.hideColumns, type)
        return !state.hideColumns.includes(type)
    }

    return (
        <Container width="100%" sx={{
            overflow: 'hidden',
            maxHeight: 'calc(100vh - 300px)'
        }} >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="h5" sx={{
                    textAlign: 'center',
                    marginRight: 'auto'
                }}>Creatures</Typography>
                <Button onClick={() => {props.updateEncounter(getRandomEncounter(3))}}>Get random encoutner</Button>
                <FormControl sx={{
                    m: 1
                }}>
                    <InputLabel id='hide-column-select-label'>Show/hide columns</InputLabel>
                    <Select sx={{
                        minWidth: '200px'
                    }}
                        label='hide-column-select-label'
                        id="hide-column-select"
                        multiple
                        endAdornment={<IconButton sx={{ visibility: state.hideColumns.length ? "visible" : "hidden", m: 1 }} onClick={handleClearClick}><Clear /></IconButton>}
                        value={state.hideColumns} 
                        onChange={handleChange}
                            >
                        {columns.filter(column => column.type !== 'empty').map(column => (
                            <MenuItem
                                
                                key={column.value}
                                value={column.value}
                            >
                                {column.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            
                <TableContainer  sx={{
                    overflow: 'auto',
                    maxHeight: 'calc(100vh - 500px)'
                }} >
                    <Table stickyHeader={true}>
                        <TableHead >
                            <TableRow sx={{
                                borderBottom: '1px solid grey'
                            }}>
                                {columns.filter(column => isColumnVisible(column.value)).map(column => (
                                    <TableCell sx={{
                                        background: theme.palette.tertiary.main,
                                        borderBottom: '0px',
                                        minWidth: column.minWidth,
                                        padding: '3.5px'
                                    }} > 
                                        <TableHeader options={column.options ? options[column.options as keyof typeof options] : []} column={column}></TableHeader>
                                        
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data?.results?.map((creature: Creature, index: number) => (
                                <TableRow
                                    key={creature.name}
                                    sx={{
                                        background: index % 2 ? theme.palette.tertiary.dark : ''
                                    }}
                                >
                                    <TableCell sx={{
                                        border: '0px'
                                    }}><SearchButton></SearchButton></TableCell>

                                    {columns.filter( column => column.type !== 'empty' && isColumnVisible(column.value)).map((column: Column, index: number) => (
                                        <TableCell sx={{
                                            border: '0px'
                                        }}>{creature[column.value]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Container>

    )
}

export default BasicTable