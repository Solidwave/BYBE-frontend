import { ColumnsType } from "../../types/Column"


export const columns: ColumnsType = [

    {
        value: 'name',
        label: 'Name',
        type: 'input',
        minWidth: 200,
        grid: 6
    },
    {
        value: 'level',
        label: 'Level',
        type: 'slider',
        disabled: true,
        minWidth: 100,
        max: 25,
        min: -1,
        grid: 6
    },
    {
        value: 'hp',
        disabled: true,
        label: 'Hp',
        type: 'slider',
        minWidth: 100,
        max: 600,
        min: 0,
        grid: 6
    },
    {
        value: 'family',
        label: 'Family',
        type: 'select',
        options: 'families',
        minWidth: 100,
        grid: 6
    },
    {
        value: 'alignment',
        label: 'Alignment',
        type: 'select',
        options: 'alignments',
        minWidth: 100,
        grid: 6
    },
    {
        value: 'size',
        label: 'Size',
        type: 'select',
        options: 'sizes',
        minWidth: 100,
        grid: 6
    },
    {
        value: 'rarity',
        label: 'Rarity',
        type: 'select',
        options: 'rarities',
        minWidth: 100,
        grid: 6

    }
]

export const orderOptions = [
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