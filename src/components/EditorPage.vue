<template>
    <node-view-wrapper class="editor-page">
        <node-view-content class="content" />
    </node-view-wrapper>
</template>
  
<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },
    props: nodeViewProps,
}
</script>
  
<style lang="scss">
.editor-page { 
    background-color: #FFF;
    border: 3px solid #0D0D0D;
    border-radius: 0 0 10px 10px;
    padding: 50px 40px;
    margin-bottom: 40px;
}

.content {
    max-height: 900px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>