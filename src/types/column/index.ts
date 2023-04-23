export type Column = {
    value: 'name' | 'level' | 'hp' | 'family' | 'alignment' | 'size' | 'rarity'
    type: ColumnType
    label: string
    options?: 'families' | 'rarities' | 'sizes' | 'alignments'
    minWidth?: number
    maxWidth?: string,
    subColumns?: Column[]
    subtype?: string
    align?: 'right'
}

export type Option = {
    value: string
    label: string
}

export type ColumnType = 'empty' | 'input' | 'select' | 'double' | 'text'