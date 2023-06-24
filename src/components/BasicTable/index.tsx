import React from "react";
import { Button,  IconButton, Menu, MenuItem, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material"
import { useGetAlignmentsListQuery, useGetCreaturesListQuery, useGetFamiliesListQuery, useGetRaritiesListQuery, useGetSizesListQuery } from "../../services/creatures"
import { VisibilityOff } from "@mui/icons-material"
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SortIcon from '@mui/icons-material/Sort';
import { Creature } from "../../types/Creature"
import { useEffect, useState } from "react"
import Container from "../Container"
import SearchButton from "./SearchButton"
import { Column } from "../../types/Column"
import TableHeader from "./TableHeader"
import { useInView } from "react-intersection-observer"
import { isArray, uniqueId } from "lodash"

type Props = {
    onRowClick?: (creature: Creature) => void
}

const page_size = 50

export type FiltersType = {
    name_filter?: string,
    family_filter?: string,
    rarity_filter?: string,
    size_filter?: string,
    min_level_filter?: number,
    max_level_filter?: number,
    min_hp_filter?:  number,
    max_hp_filter?:  number,
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

    const [resetFilters, setResetFilters] = useState(false)

    const { data, isLoading, isFetching, isError } = useGetCreaturesListQuery({ cursor, order,sort_field: sortField, page_size, ...filters })

    const [localData, setLocalData] = useState<Creature[]>(data?.results || [])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const [anchorElHide, setAnchorElHide] = useState<null | HTMLElement>(null);

    const hideOpen = Boolean(anchorElHide);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickHide = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElHide(event.currentTarget);
    };

    const handleCloseHide = () => {
        setAnchorElHide(null);
    };

    useEffect(() => {
        if (resetFilters) {
            setResetFilters(false)
        }
    },[resetFilters])

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

    const [hideColumns, setHideColumns] = useState<string[]>([])

    const loading = cursor === 0 && (isLoading || isFetching)

    const handleChange = (value : string) => {
        const tmpHideColumns = [...hideColumns]

        const index = tmpHideColumns.indexOf(value)

        if (index != -1) {
            tmpHideColumns.splice(index, 1)
        } else {
            tmpHideColumns.push(value)
        }

        setHideColumns(tmpHideColumns)
        
    };

    const isColumnVisible = (type: string) => {
        return !hideColumns.includes(type)
    }

    const onFilterChange = (filterName: string | string[], value:  string | string[] | number | number[]) => {
        const tmpFilters = { ...filters }

        if (isArray(filterName) && isArray(value)) {
            for (let i = 0; i < filterName.length; i++) {
                const tmpFilterName = filterName[i];

                const tmpFilterValue = value[i]

                tmpFilters[tmpFilterName] = tmpFilterValue
                
            }
        } else if (!isArray(filterName) && !isArray(value)) {
            tmpFilters[filterName] = value
        }

        setCursor(0)

        setFilters(tmpFilters)
    }

    const placeHolder = () => [...Array(page_size).keys()].map(() => (
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
                <Button onClick={() => {
                    setCursor(0)
                    setFilters({})
                    setResetFilters(true)
                }} >Clear Filters</Button>
                <IconButton onClick={handleClickHide}>
                    <VisibilityOff />
                </IconButton>
                <Menu open={hideOpen} onClose={handleCloseHide} anchorEl={anchorElHide}>
                    {columns.filter(column => column.type !== 'empty').map(column => {
                        const hidden = hideColumns.indexOf(column.value) !== -1
                        return (
                            <MenuItem
                                key={column.value}
                                value={column.value}
                                sx={{
                                    textDecoration: hidden ? 'line-through' : '',
                                    opacity: hidden ? 0.5 : 1,
                                }}
                                onClick={() => handleChange(column.value)}
                            >
                            {column.label}
                        </MenuItem>
                        )
                    })}
                </Menu>
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
                                    <IconButton sx={{
                                        margin: 'auto'
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
                                        margin: 'auto'
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
                                    <TableHeader resetFilters={resetFilters} onChange={onFilterChange} options={typeof column.options === 'string' ? options[column.options as keyof typeof options] : column.options} column={column}></TableHeader>
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