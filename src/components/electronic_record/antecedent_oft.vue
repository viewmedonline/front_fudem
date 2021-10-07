<template>
  <v-container>
    <v-form autocomplete="off" ref="formAntecedentOftRef" v-model="formAntecedentOft" lazy-validation>
    <v-card>
        <v-card-title primary-title>
            <span class="subheading">{{$t('title.antecedents')}}</span>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-text>
            <v-container fluid grid-list-md px-0 py-0>
                <v-layout align-center justify-center row fill-height>
                    <v-flex xs12 sm8>
                        <v-textarea
                        name="input-7-1"
                        :label="$t('title.antecedents')"
                        v-model="antecedents"
                        :rules="[rules.required]"
                        outline
                        ></v-textarea>
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
    name: 'antecedent_oft',
    data () {
      return {
        formAntecedentOft: false,
        antecedents: null,
        rules: {
            required: v => !!v || this.$t('title.field_required')
        }
      }
    }
  }
</script>