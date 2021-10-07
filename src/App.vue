<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// App.vue
import WebFontLoader from 'webfontloader'
import { EventBus } from "@/store/eventBus";
export default {
  data: () => ({
    preventSubmit : true
  }),
  created () {
    this.$i18n.locale = 'es'
  },
  mounted () {
    //console.log(process.env.NODE_ENV)
    //console.log(process.env.VUE_APP_ROOT_API)
    EventBus.$on('offValidateClose', value => {
      this.preventSubmit = false
    });
    WebFontLoader.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900']
      },
      active: this.setFontLoaded
    })
    window.addEventListener("beforeunload", this.validateClose);
  },
  methods: {
    validateClose(event) {
      if (this.preventSubmit) {
        var confirmationMessage = "Esta saliendo de Viewmed...."
        event.returnValue = confirmationMessage    // Gecko, Trident, Chrome 34+
        return confirmationMessage              // Gecko, WebKit, Chrome <34
      }
    },
    setFontLoaded () {
      this.$emit('font-loaded')
    },
    cleanStore () {
        const listState = [
          'comps',
          'typeConsulting',
          'tabsActive'
        ]

        const ignoreItems = {
            array: [],
            string: []
        }

        const changeToString = []

        async function clean (listState) {
          let type
          for (let i in listState) {
            if (Array.isArray(listState[i])) type = 'array'
            else type = typeof listState[i]

            switch(type) {
              case 'array':
                if(ignoreItems.array.includes(i)) await clean(listState[i])
                else listState[i] = []
              break
              case 'object':
                await clean(listState[i])
              break
              case 'boolean':
                listState[i] = false
              break
              default:
                if(ignoreItems.string.includes(i)) listState[i] = 0
                else listState[i] = null
              break
            }
          }

          return true
      }

      async function callClean(vm, listState) {
        for (let i in listState) {
          await clean(vm.$store.state[listState[i]], ignoreItems)
        }
        return 1
      } 
      
      callClean(this, listState)
        .then(result => {
          this.$store.state['consultation'] = {}
          this.$store.state['physician'] = {}
          this.$store.state['patient'] = {}
        })
    }
  },
  beforeDestroy(){
    this.cleanStore()
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
