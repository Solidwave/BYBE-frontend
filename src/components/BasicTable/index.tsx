import { FormControl, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material"
import { useGetAlignmentsListQuery, useGetCreaturesListQuery, useGetFamiliesListQuery, useGetRaritiesListQuery, useGetSizesListQuery } from "../../services/creatures"
import { Clear } from "@mui/icons-material"
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SortIcon from '@mui/icons-material/Sort';
import { Creature } from "../../types/Creature"
import { useEffect, useState } from "react"
import Container from "../Container"
import SearchButton from "./SearchButton"
import { Column } from "../../types/Column"
import TableHeader from "./TableHeader"
import { useInView } from "react-intersection-observer"
import { uniqueId } from "lodash"

type StateType = {
    hideColumns: string[]
}

type Props = {
    updateEncounter?: Function,
    onRowClick?: Function
}

const page_size = 50

type FiltersType = {
    name_filter?: string,
    family_filter?: string,
    rarity_filter?: string,
    size_filter?: string
}

type ColumnsType = Column[]

const orderOptions = [
    {
        value: 'ID',
        label: 'Id'
    },
    {
        value: 'NAME',
        label: 'Name'
    }, {
        value: 'HP',
        label: 'Hp'
    },
    {
        value: 'FAMILY',
        label: 'Family'
    },
    {
        value: 'LEVEL',
        label: 'Level'
    },
    {
        value: 'ALIGNMENT',
        label: 'Alignement'
    },
    {
        value: 'SIZE',
        label: 'Size'
    },
    {
        value: 'RARITY',
        label: 'Rarity'
    }
]

const columns: ColumnsType = [

    {
        value: 'name',
        label: 'Name',
        type: 'input',
        minWidth: 200
    },
    {
        value: 'level',
        label: 'Level',
        type: 'slider',
        disabled: true,
        minWidth: 100,
        max: 25,
        min: -1

    },
    {
        value: 'hp',
        disabled: true,
        label: 'Hp',
        type: 'slider',
        minWidth: 100,
        max: 600,
        min: 0

    },
    {
        value: 'family',
        label: 'Family',
        type: 'select',
        options: 'families',
        minWidth: 100
    },
    {
        value: 'alignment',
        label: 'Alignment',
        type: 'select',
        options: 'alignments',
        minWidth: 100
    },
    {
        value: 'size',
        label: 'Size',
        type: 'select',
        options: 'sizes',
        minWidth: 100
    },
    {
        value: 'rarity',
        label: 'Rarity',
        type: 'select',
        options: 'rarities',
        minWidth: 100

    }
]

const BasicTable = ({ onRowClick }: Props) => {

    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            setCursor(parseInt(entry?.target.getAttribute('data-cursor') || '0') + 1)
        }
    }, [inView, entry])

    const [cursor, setCursor] = useState(0)

    const [order, setOrder] = useState<string>('ASCENDING')

    const [sortField, setSortField] = useState<string>('ID')

    const [filters, setFilters] = useState<FiltersType>({})

    const { data, isLoading, isFetching, isError } = useGetCreaturesListQuery({ cursor, order,sort_field: sortField, page_size, ...filters })

    const [localData, setLocalData] = useState<Creature[]>(data?.results || [])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (cursor != 0 ) {
            setLocalData([...localData, ...data?.results || []])
        } else {
            setLocalData(data?.results || [])
        }
    }, [order, filters, data])

    const options = {
        families: useGetFamiliesListQuery('').data?.map((family) => ({
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

    const loading = cursor === 0 && (isLoading || isFetching)

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

    const onFilterChange = (filterName: string, value: string) => {
        let tmpFilters = { ...filters }

        tmpFilters[filterName as keyof FiltersType] = value

        setCursor(0)
        
        setFilters(tmpFilters)
    }

    const placeHolder = () => [...Array(page_size).keys()].map((item,index) => (
        <TableRow key={uniqueId("prefix")}>
            {columns.map((column: Column, index: number) => (
                <TableCell key={index} sx={{
                    border: '0px',
                }}><Skeleton ></Skeleton></TableCell>

            ))}
            <TableCell key='placeholder' sx={{
                border: '0px'
            }}><Skeleton ></Skeleton></TableCell>
        </TableRow>
    ))

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
                        color='secondary'
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
                                style={{
                                    fontWeight: state.hideColumns.indexOf(column.value) === -1 ? 400 : 700
                                }}
                            >
                                {column.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <TableContainer sx={{
                overflow: 'auto',
                maxHeight: 'calc(100vh - 500px)',
                minHeight: 'calc(100vh - 500px)',
            }} >
                <Table sx={{
                    minWidth: '1100px',
                    maxWidth: '1100px'
                }} stickyHeader={true}>
                    <TableHead >
                        <TableRow sx={{
                            borderBottom: '1px solid grey'
                        }}>
                            <TableCell key={'order'} sx={{
                                background: '#BF9E6D',
                                borderBottom: '0px',
                                padding: '3.5px',
                               
                            }} >
                                <div style={{
                                    display: 'flex',
                                }}>
                                    <IconButton  sx={{
                                        minWidth: '56px',
                                        minHeight: '56px'
                                    }} onClick={handleClick}>
                                        <SortIcon />
                                    </IconButton>
                                    <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
                                        {orderOptions.map(option => (
                                            <MenuItem value={option.value} sx={{
                                                fontWeight: option.value === sortField ? '700' : 400
                                            }} onClick={() => {
                                                setCursor(0)
                                                setAnchorEl(null)
                                                setSortField(option.value || '')
                                            }} key={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Menu>
                                    <IconButton sx={{
                                        minWidth: '56px',
                                        minHeight: '56px'
                                    }} onClick={() => {
                                        if (order === 'ASCENDING') {
                                            setOrder('DESCENDING')
                                        } else {
                                            setOrder('ASCENDING')
                                        }
                                    }}>
                                        <ImportExportIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                            {columns.filter(column => isColumnVisible(column.value)).map((column, index) => (
                                <TableCell key={index} sx={{
                                    background: '#BF9E6D',
                                    borderBottom: '0px',
                                    minWidth: column.minWidth,
                                    maxWidth: column.minWidth,
                                    padding: '3.5px'
                                }} >
                                    <TableHeader onChange={onFilterChange} options={typeof column.options === 'string' ? options[column.options as keyof typeof options] : column.options} column={column}></TableHeader>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? placeHolder() :
                            localData.map((creature: Creature, index: number) => {
                                const cursor = index + 1

                                const last = localData.length >= (page_size - 1) && index === localData.length - 1

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
                                        data-cursor={cursor}
                                    >
                                        <TableCell sx={{
                                            border: '0px'
                                        }}>
                                            <SearchButton link={creature.archive_link || ''}></SearchButton>
                                        </TableCell>
                                        {columns.filter(column => column.type !== 'empty' && isColumnVisible(column.value)).map((column: Column, index: number) => (
                                            <TableCell key={index} sx={{
                                                border: '0px',
                                                minWidth: column.minWidth,
                                                maxWidth: column.minWidth
                                            }}>{creature[column.value]}</TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })}
                        {!loading && data?.next && placeHolder()}
                            {isError && <Typography>Sorry! Something went wrong while trying get all the creatures! Try again later..</Typography>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    )
}

export default BasicTable