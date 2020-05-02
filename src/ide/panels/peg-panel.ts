import { Network } from 'vis-metapkg';
import { Hypergraph } from '../../analysis/hypergraph';


class PegPanel {

    $el: HTMLDivElement
    peg: Hypergraph
    network: Network

    constructor() {
        this.$el = document.createElement('div');
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