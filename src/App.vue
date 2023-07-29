<template>
  <div class="app">
    <tiptap-editor />
  </div>
</template>

<script>
  import TiptapEditor from '@/components/TiptapEditor.vue';

  export default {
    components: {
      TiptapEditor,
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #fffacd;
  }

</style>
