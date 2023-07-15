export type Column = {
    value: 'name' | 'level' | 'hp' | 'family' | 'alignment' | 'size' | 'rarity' | 'level'
    type: ColumnType
    label: string
    icon?: string,
    disabled?: boolean,
    options?: 'families' | 'rarities' | 'sizes' | 'alignments' | OptionType[]
    minWidth?: number
    maxWidth?: string,
    subColumns?: Column[]
    min?: number,
    max?: number,
    subtype?: string
    align?: 'right',
    grid?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export type ColumnsType = Column[]


export type OptionType = {
    value: string
    label: string
}

export type ColumnType = 'empty' | 'input' | 'select' | 'double' | 'text' | 'singleSelect' | 'slider'