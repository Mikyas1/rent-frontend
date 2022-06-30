import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa', // use fa-<icon-name> mdi-<icon-name>
    },
    theme: {
        themes: {
          light: {
            primary: '#4CAF50',
            secondary: '#039BE5',
          },
          dark:{
            primary: '#7c4dff',
            secondary: '#F83F37',
          }
        }
      }
});
