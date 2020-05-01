import { Hypergraph } from '../../analysis/hypergraph';


class PegPanel {

    $el: HTMLElement

    constructor() {
        this.$el = document.createElement('div');

    }

    show(hg: Hypergraph) {
        hg.toVis().render(this.$el);
    }

}


export { PegPanel }