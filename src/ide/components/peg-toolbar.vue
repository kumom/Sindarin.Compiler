<template>
    <div class="toolbar" @click="action">
        <button name="syntax">Syntax</button>
        <button name="semantics">Semantics</button>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    flex-direction: column;
}
.toolbar button {
    background: white;
    border-radius: 5px;
    border: 2px solid #aaa;
    color: #666;
    margin-bottom: .2em;
}
.toolbar button:hover {
    background: #aaf;
    border-color: #88c;
    color: white;
}
.toolbar button:focus {
    outline: none;
}
</style>

<script>
export default {
    methods: {
        action(ev) {
            var type = ev.target.name;
            if (type) this.$emit('action', {type});
        }
    }
}
</script>