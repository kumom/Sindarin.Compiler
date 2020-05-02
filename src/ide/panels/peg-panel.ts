import Vue from 'vue';
import Component from 'vue-class-component';

import { Network } from 'vis-metapkg';
import { Hypergraph } from '../../analysis/hypergraph';



@Component
class PegPanel extends Vue {

    $el: HTMLDivElement
    peg: Hypergraph
    network: Network

    render(createElement) {
        return createElement('div');
    }

    show(peg: Hypergraph) {
        this.peg = peg;
        this.network = peg.toVis().render(this.$el);
    }

    showConfig() {
        var cpanel = new PegConfigPanel();
        cpanel.show(this.network);
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

    show(network: Network) {
        network.setOptions({configure: {container: this.$el}});
    }

}


export { PegPanel }