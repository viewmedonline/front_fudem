<template>
    <v-container>
        <v-form autocomplete="off" ref="retinalCameraRef" v-model="formRetinalCamera" lazy-validation>
            <v-card class="elevation-3">
                <v-card-title primary-title class="blue-grey darken-1">
                    <span class="subheading white--text text-capitalize">Cámara de Retina</span>
                </v-card-title>
                <v-divider light class="vm-border-color-2"></v-divider>
                <v-card-text>
                    <v-container fluid grid-list-md px-0 py-0>

                        <v-layout row wrap>
                            <v-flex xs2 text-sm-left class="vm-p-esp">
                                <span class="body-2">{{ title }}</span>
                            </v-flex>
                            <v-flex xs2>
                                <v-select :items="items" label="Seleccione" :rules="[rules.required]"
                                    v-model="photo_retinal"></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>
<script>
export default {
    name: 'retinalCamera',
    data() {
        return {
            formRetinalCamera: false,
            photo_retinal: null,
            items: ["Si", "No"],
            rules: {
                required: v => !!v || this.$t('title.field_required')
            }
        }
    },
    mounted() {
        if (this.title == "Fotografía de Retina") {
            this.items = ["Si", "No"]
        } else {
            this.items = ["Positivo", "Negativo"]
        }
    },
    methods: {
        saveRetinalCamera() {
            return new Promise((resolve, reject) => {
                if (this.$refs.retinalCameraRef.validate()) {
                    resolve(this.photo_retinal)
                } else {
                    reject(false)
                }
            })
        },
    },
    props: {
        title: String,

    }
}
</script>