export type Creature = {
    id: string,
    name: string,
    hp: number,
    level: number,
    family: string,
    alignment: string,
    size: string,
    rarity: string,
    archive_link?: string,
    quantity?: number,
    variant?: 'weak' | 'normal' | 'elite'
}

export type Variant = 'elite' | 'weak' | 'normal'
