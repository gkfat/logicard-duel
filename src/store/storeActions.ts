export const StoreAction = {
    general: {
        changeGameState: 'changeGameState',
        updateShop: 'updateShop',
        fetchData: 'fetchData',
        updateData: 'updateData',
    },
    player: {
        selectCharacter: 'selectCharacter',
        generateEnemy: 'generateEnemy',
        playerMumble: 'playerMumble',
        enemyMumble: 'enemyMumble',
        deduction: 'deduction',
        heal: 'heal',
        updatePlayer: 'updatePlayer',
    },
    switch: {
        switchSpinner: 'switchSpinner',
        switchRank: 'switchRank',
        switchBackpack: 'switchBackpack',
        switchShop: 'switchShop',
    }
}