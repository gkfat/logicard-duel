 
export enum enumCharacter {
    Man = 'man',
    Nerd = 'nerd',
    Broker = 'broker',
    Grandma = 'grandma',
    Artist = 'artist',

    GkbotWorker = 'gkbot_worker',
    GkbotPerform = 'gkbot_perform',
    GkbotAttack = 'gkbot_attack',
    GkbotDefense = 'gkbot_defense',
}

export const OpponentValues = Object.values([
    enumCharacter.GkbotWorker,
    enumCharacter.GkbotPerform,
    enumCharacter.GkbotAttack,
    enumCharacter.GkbotDefense,
]);
