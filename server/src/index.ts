import bootApp from 'boot';

const app = bootApp()

export default {
    fetch: (await app).fetch,
}
