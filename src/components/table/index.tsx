import { CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material"
import { useGetCreaturesListQuery, useGetFamiliesListQuery } from "../../services/creatures"
import { Creature } from "../../types/creature"
import { useState } from "react"
import Container from "../container"
import SearchButton from "./SearchButton"
import { Column } from "../../types/column"
import TableHeader from "./TableHeader"
type StateType = {
    hideColumns: string[]
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
        type: 'input'

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

const BasicTable = () => {
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

    return (
        <Container width="100%" sx={{
            overflow: 'auto'
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
                <FormControl>
                    <InputLabel id='hide-column-select-label'>Show/hide columns</InputLabel>
                    <Select sx={{
                        m: 1,
                        minWidth: '200px'
                    }}
                        label='hide-column-select-label'
                        id="hide-column-select"
                        multiple
                        inputProps={{
                            
                        }}
                        value={state.hideColumns} 
                        onChange={handleChange}
                            >
                        {columns.map(column => (
                            <MenuItem
                                sx={{
                                    minWidth: column.minWidth,
                                    maxWidth: column.maxWidth,
                                }}
                                key={column.value}
                                value={column.value}
                            >
                                {column.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{
                overflow: 'hidden'
            }}>
                <TableContainer sx={{
                    maxHeight: '400px'
                }}  >
                    <Table stickyHeader={true}>
                        <TableHead >
                            <TableRow sx={{
                                borderBottom: '1px solid grey'
                            }}>
                                {columns.map(column => (
                                    <TableCell sx={{
                                        background: theme.palette.tertiary.main,
                                        borderBottom: '0px',
                                        padding: '3.5px'
                                    }} > <TableHeader options={column.options ? options[column.options as keyof typeof options] : []} column={column}></TableHeader></TableCell>
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

                                    {columns.filter( column => column.type !== 'empty').map((column: Column, index: number) => (
                                        <TableCell sx={{
                                            border: '0px'
                                        }}>{creature[column.value]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </Container>

    )
}

export default BasicTable