export const ShopLimit = {
    Item: 10,
    Card: 10,
};

const host = 'https://storage.googleapis.com/logicard_duel';
const dir = {
    avatars: 'avatars',
    icons: 'icons',
    gifs: 'gifs',
};

const prefix_avatars = `${host}/${dir.avatars}`;
const prefix_icons = `${host}/${dir.icons}`;

export const ImageDataList = {
    avatar: {
        man: `${prefix_avatars}/man.png`,
        fat: `${prefix_avatars}/fat.png`,
        broker: `${prefix_avatars}/broker.png`,
        grandma: `${prefix_avatars}/grandma.png`,
        artist: `${prefix_avatars}/artist.png`,
        gkbotWorker: `${prefix_avatars}/gkbot-worker.png`,
        gkbotPerform: `${prefix_avatars}/gkbot-perform.png`,
        gkbotDefense: `${prefix_avatars}/gkbot-defense.png`,
        gkbotAttack: `${prefix_avatars}/gkbot-attack.png`,
    },
    icon: {
        github: `${prefix_icons}/github.png`,
        mail: `${prefix_icons}/mail.png`,
        rank: `${prefix_icons}/rank.png`,
        backapck: `${prefix_icons}/backpack.png`,
        logoLogicard: `${prefix_icons}/logo-logicard.png`,
        attack: `${prefix_icons}/attack.png`,
        defense: `${prefix_icons}/defense.png`,
        heal: `${prefix_icons}/heal.png`,
        cardbackLogicard: `${prefix_icons}/cardback-logicard.png`,
        cardbackTech: `${prefix_icons}/cardback-tech.png`,
        coin: `${prefix_icons}/coin.png`,
        bat: `${prefix_icons}/bat.png`,
        boxer: `${prefix_icons}/boxer.png`,
        gun: `${prefix_icons}/gun.png`,
        cloth: `${prefix_icons}/cloth.png`,
        armor: `${prefix_icons}/armor.png`,
        bulletproof: `${prefix_icons}/bulletproof.png`,
        player: `${prefix_icons}/player.png`,
        shop: `${prefix_icons}/shop.png`,
        placeholderHead: `${prefix_icons}/placeholder_head.png`,
        placeholderBody: `${prefix_icons}/placeholder_body.png`,
        placeholderHand: `${prefix_icons}/placeholder_hand.png`,
        placeholderPants: `${prefix_icons}/placeholder_pants.png`,
        placeholderShoes: `${prefix_icons}/placeholder_shoes.png`,
    },
};
