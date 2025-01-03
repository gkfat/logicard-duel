<template>
    <v-container>
        <v-row class="ma-0 flex-nowrap">
            <v-col
                cols="3"
                class="pa-1"
            >
                Author
            </v-col>
            <v-col
                cols="1"
                class="pa-1"
            >
                |
            </v-col>
            <v-col class="pa-1">
                Gk
            </v-col>
        </v-row>
        <v-row class="ma-0 flex-nowrap align-center">
            <v-col
                cols="3"
                class="text-no-wrap pa-1"
            >
                Github
            </v-col>
            <v-col
                cols="1"
                class="pa-1"
            >
                |
            </v-col>
            <v-col class="pa-1">
                <v-btn
                    flat
                    variant="text"
                    :ripple="false"
                    color="bluegrey"
                    text="github.com/gkfat"
                    class="text-none pa-0"
                    @click="openGithub"
                />
            </v-col>
        </v-row>
        <v-row class="ma-0 flex-nowrap">
            <v-col
                cols="3"
                class="pa-1"
            >
                Email
            </v-col>
            <v-col
                cols="1"
                class="pa-1"
            >
                |
            </v-col>
            <v-col class="pa-1">
                gkgkdesign@gmail.com
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
const openGithub = async () => {
    window.open('https://github.com/gkfat/logicard-duel/', '_blank');
};
</script>
