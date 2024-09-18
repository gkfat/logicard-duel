/* eslint-disable no-unused-vars */
export enum enumEquip {
    Armor = 'armor',
    Boxer = 'boxer',
    Bat = 'bat',
    Gun = 'gun',
    Cloth = 'cloth',
    BulletProof = 'bullet_proof',
}

/** 裝備位置 */
export enum enumEquipPosition {
    Head = 'head',
    PrimaryHand = 'primary_hand',
    SecondaryHand = 'secondary_hand',
    Body = 'body',
    Pants = 'pants',
    Shoes = 'shoes',
}

export const EquipValues = Object.values(enumEquip);
