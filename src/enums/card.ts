
export enum enumCard {
    // 攻擊類型
    LogiCardAttack = 'logicard_attack',
    ScrewDriver = 'screw_driver',
    Hammer = 'hammer',

    // 防禦類型
    LogiCardDefense = 'logicard_defense',
    ScrapMetal = 'scrap_metal',
    GkbotShell = 'gkbot_shell',

    // 治療類型
    Battery = 'battery',
    Oil = 'oil'
}

export const CardValues = Object.values(enumCard);
