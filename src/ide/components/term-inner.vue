<template>
    <span class="term-inner"
                @mouseenter="enter" @mouseleave="leave">
        <span class="type">{{type}}</span>
        <span class="action action-peg" @click="action('peg')">☩</span>
    </span>
</template>
<script>
export default {
    name: "term-inner",
    props: ["type", "at", "ast"],
    methods: {
        enter() {
            if (this.at && this.at.highlight)
                this._mark = this.at.highlight();
        },
        leave() {
            if (this.at && this.at.unhighlight)
                this._mark = this.at.unhighlight();
        },
        action(type) {
            this.$emit('action', {type, target: this});
        }
    }
}
</script>