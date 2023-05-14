export type Column = {
    value: 'name' | 'level' | 'hp' | 'family' | 'alignment' | 'size' | 'rarity' 
    type: ColumnType
    label: string
    icon?: string,
    options?: 'families' | 'rarities' | 'sizes' | 'alignments' | OptionType[]
    minWidth?: number
    maxWidth?: string,
    subColumns?: Column[]
    subtype?: string
    align?: 'right'
}

export type OptionType = {
    value: string
    label: string
}

export type ColumnType = 'empty' | 'input' | 'select' | 'double' | 'text' | 'singleSelect'