export type EncounterForm = {
    fields: EncounterField[],
    actions: FormActionType[]
}

export type FormActionType = {
    type: 'submit',
    label: string
}

export type EncounterField = {
    type: 'input' | 'select' | 'array',
    label: string,
    fieldName: 'size' | 'party_levels' | 'rarity' | 'family' | 'alignment',
    options?: Option[] | 'families',
    multiple?: boolean,
    forBody?: boolean
}

export type Option = {
    value: string,
    label: string
}