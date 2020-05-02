<template>
    <div id="ide">
        <div v-for="panel in panels" :key="panel.id"
                class="panel"
                :class="['panel__' + (panel._component || panel.id)]">
            <component 
                :is="panel._component || panel.id"
                :ref="panel.id" />
        </div>
    </div>
</template>
<script>
export default {
    props: ["panels"]
}
</script>