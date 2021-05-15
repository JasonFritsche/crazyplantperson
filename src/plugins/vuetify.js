import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primaryOne: colors.green.lighten4,
        primaryTwo: colors.blue.lighten4,
        secondaryOne: colors.cyan.lighten5,
        secondaryTwo: colors.purple.lighten4,
        accent: colors.blueGrey.darken1,
        error: colors.red.accent3,
      },
      dark: {
        primaryOne: colors.teal.darken4,
        primaryTwo: colors.blueGrey.darken4,
        secondaryOne: colors.cyan.darken4,
        secondaryTwo: colors.indigo.darken3,
        accent: colors.blue.darken1,
        error: colors.red.darken1,
      },
    },
  },
});
