import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material"
import { useGetAlignmentsListQuery, useGetCreaturesListQuery, useGetFamiliesListQuery, useGetRaritiesListQuery, useGetSizesListQuery } from "../../services/creatures"
import { Clear } from "@mui/icons-material"
import { Creature } from "../../types/creature"
import { useEffect, useMemo, useRef, useState } from "react"
import Container from "../container"
import SearchButton from "./SearchButton"
import { Column } from "../../types/column"
import TableHeader from "./TableHeader"
import { useInView } from "react-intersection-observer"
type StateType = {
    hideColumns: string[]
}

type Props = {
    updateEncounter?: Function,
    onRowClick?: Function
}

const pageSize = 50

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
        type: 'select',
        options: 'alignments'

    },
    {
        value: 'size',
        label: 'Size',
        type: 'select',
        options: 'sizes'
    },
    {
        value: 'rarity',
        label: 'Rarity',
        type: 'select',
        options: 'rarities'

    }
]

const BasicTable = ({ onRowClick }: Props) => {

    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        console.log(entry?.target.getAttribute('data-cursor'));
        
        if (inView) {
            setCurrentPage(parseInt(entry?.target.getAttribute('data-cursor') || '0') + 1)
        }
        
        
    },[inView])
    

    const [currentPage, setCurrentPage] = useState(0)

    const {data, isLoading} = useGetCreaturesListQuery(currentPage)

    const [localData, setLocalData] = useState<Creature[]>(data?.results || [])

    useEffect(() => {
         
        setLocalData([...localData,...data?.results || []])
    }, [data])

    const options = {
        families: useGetFamiliesListQuery('').data?.map(family => ({
            label: family,
            value: family
        })),
        rarities: useGetRaritiesListQuery('').data?.map(rarity => ({
            label: rarity,
            value: rarity
        })),
        alignments: useGetAlignmentsListQuery('').data?.map(alignment => ({
            label: alignment,
            value: alignment
        })),
        sizes: useGetSizesListQuery('').data?.map(size => ({
            label: size,
            value: size
        }))
    }

    const theme = useTheme()

    const [state, setState] = useState<StateType>({
        hideColumns: []
    })

    if (currentPage === 0 && isLoading) {
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
            { ...state, hideColumns: [] }
        );
    };


    const isColumnVisible = (type: string) => {
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

            <TableContainer sx={{
                overflow: 'auto',
                maxHeight: 'calc(100vh - 500px)'
            }} >
                <Table stickyHeader={true}>
                    <TableHead >
                        <TableRow sx={{
                            borderBottom: '1px solid grey'
                        }}>
                            {columns.filter(column => isColumnVisible(column.value)).map((column, index) => (
                                <TableCell key={index} sx={{
                                    background: '#BF9E6D',
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
                        {localData.map((creature: Creature, index: number) => {
                            const page = Math.floor((index + 1)/pageSize)

                            
                            const last = index === localData.length - 1
                            return (
                            <TableRow
                                key={index}
                                ref={last ? ref : null}
                                onClick={() => {
                                    if (onRowClick) {
                                        onRowClick(creature)
                                    }
                                }}
                                sx={{
                                    background: index % 2 ? theme.palette.tertiary.dark : '',
                                    cursor: 'pointer'
                                }}
                                data-cursor={page}
                                
                            >
                                <TableCell  sx={{
                                    border: '0px'
                                }}>
                                    <SearchButton link={creature.archive_link || ''}></SearchButton></TableCell>
                                {columns.filter(column => column.type !== 'empty' && isColumnVisible(column.value)).map((column: Column, index: number) => (
                                    <TableCell key={index} sx={{
                                        border: '0px'
                                    }}>{creature[column.value]}</TableCell>
                                ))}
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    )
}

export default BasicTable