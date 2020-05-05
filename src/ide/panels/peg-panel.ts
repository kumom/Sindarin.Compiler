import Vue from 'vue';
import Component from 'vue-class-component';

import { Hypergraph, HypergraphView } from '../../analysis/hypergraph';



@Component
class PegPanel extends Vue {

    $el: HTMLDivElement
    peg: Hypergraph
    view: HypergraphView

    render(createElement) {
        return createElement('div');
    }

    show(peg: Hypergraph) {
        this.peg = peg;
        this.view = peg.toVis().render(this.$el);
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