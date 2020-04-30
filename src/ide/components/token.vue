<template>
    <span class="token" :class="{mnemonic: text === type}"
                @mouseenter="enter" @mouseleave="leave">
        <span class="text">{{text}}</span>
        <span class="type">{{type}}</span>
    </span>
</template>
<script>
export default {
    name: "token",
    props: ["text", "type", "at"],
    methods: {
        enter() {
            if (this.at && this.at.highlight)
                this._mark = this.at.highlight();
        },
        leave() {
            if (this.at && this.at.unhighlight)
                this._mark = this.at.unhighlight();
        }
    }
}
</script>