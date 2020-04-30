<template>
    <li class="treeview" :class="{'treeview__expand': expand}">
        <div ref="root" v-if="root" class="treeview__root">
            <component :is="root.$component || defaultComponent"
                v-bind="(typeof root == 'string') ? {text: root} : root" />
        </div>
        <ul ref="children" v-if="children && children.length">
            <treeview v-for="(child, index) in children" :key="index"
                :root="child.root" :children="child.children"
                :defaultComponent="defaultComponent" />
        </ul>
    </li>
</template>
<script>
var treeview = {
    props: {
        root: null,
        children: {default: () => []},
        defaultComponent: {default: 'treeview-element'}
    },
    data: () => ({expand: true})
};

treeview.components = {
    treeview,  // recursive!
    'treeview-element': {
        functional: true,
        render(createElement, context) {
            var span = createElement('span');
            span.text = context.props.text;
            return span;
        }
    }
};


export default treeview;
</script>