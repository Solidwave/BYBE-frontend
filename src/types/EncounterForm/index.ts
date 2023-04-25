export type EncounterForm = {
    fields: EncounterField[],
    actions: FormActionType[]
}

export type FormActionType = {
    type: 'submit',
    label: string
}

export type EncounterField = {
    type: 'input' | 'select',
    label: string,
    fieldName: string,
    options?: Option[] | 'families',
    multiple?: boolean
}

export type Option = {
    value: string,
    label: string
}