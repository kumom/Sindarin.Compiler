import Vue from 'vue';

// @ts-ignore
import treeview from './tree.vue';
import './tree.css';
Vue.component('treeview', treeview);

// @ts-ignore
import token from './token.vue';
Vue.component('token', token);

import nonreactive from './nonreactive';


export { treeview, token, nonreactive }
