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
    readonly VITE_SHOP_REFRESH_MINUTES: number;
    readonly VITE_API_URL: string;
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
