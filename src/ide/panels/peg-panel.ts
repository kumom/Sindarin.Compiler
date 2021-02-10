import Vue from 'vue';
import Component from 'vue-class-component';

import { Hypergraph, HypergraphView } from '../../analysis/hypergraph';
// @ts-ignore
import Toolbar from '../components/peg-toolbar.vue';



@Component
class PegPanel extends Vue {

    $el: HTMLDivElement
    peg: Hypergraph
    view: HypergraphView
    toolbar: Vue

    sizeThreshold = 600

    render(createElement) {
        return createElement('div');
    }

    show(peg: Hypergraph) {
        this.peg = peg;
        if (peg.vertices.size > this.sizeThreshold) {
            console.warn(`[peg] too many vertices (${peg.vertices.size})`);
            this.$el.querySelector('canvas')?.remove(); /* clear */
        }
        else {
            this.view = peg.toVis().render(this.$el);
        }
        this.toolbar = new (Vue.component('peg-toolbar', Toolbar))();
        this.$el.append(this.toolbar.$mount().$el);
        this.$emit('show', {peg});
    }

    overlay(peg: Hypergraph) {
        this.view.overlay(peg);
    }

    showConfig() {
        var cpanel = new PegConfigPanel();
        cpanel.show(this.view);
        return cpanel;
    }

    static install() {
        Vue.component('ide-panel-peg', this);
    }

}

class PegConfigPanel {

    $el: HTMLDivElement

    constructor() {
        this.$el = document.createElement('div');
    }

    show(forView: HypergraphView) {
        forView.network.setOptions({configure: {container: this.$el}});
    }

}


export { PegPanel }
