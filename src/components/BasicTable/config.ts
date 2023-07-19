import { ColumnsType } from "../../types/Column"


export const columns: ColumnsType = [

    {
        value: 'name',
        label: 'Name',
        type: 'input',
        align: 'left',
        grid: 6,
    },
    {
        value: 'level',
        label: 'Level',
        type: 'slider',
        disabled: true,
        width: 100,
        max: 25,
        min: -1,
        grid: 6
    },
    {
        value: 'hp',
        disabled: true,
        label: 'Hp',
        type: 'slider',
        width: 100,
        max: 600,
        min: 0,
        grid: 6
    },
    {
        value: 'family',
        label: 'Family',
        type: 'select',
        options: 'families',
        width: 150,
        grid: 6
    },
    {
        value: 'alignment',
        label: 'Alignment',
        type: 'select',
        options: 'alignments',
        width: 150,
        grid: 6
    },
    {
        value: 'size',
        label: 'Size',
        width: 150,
        type: 'select',
        options: 'sizes',
        grid: 6
    },
    {
        value: 'rarity',
        label: 'Rarity',
        type: 'select',
        options: 'rarities',
        width: 100,
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