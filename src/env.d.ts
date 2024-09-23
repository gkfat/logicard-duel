/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly VITE_APP_OG_TITLE: string;
    readonly VITE_APP_OG_IMAGE: string;
    readonly VITE_APP_OG_DESCRIPTION: string;
    readonly VITE_COUNTDOWN_SECONDS: number;
    readonly VITE_HANDCARD_MAX_LIMIT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
