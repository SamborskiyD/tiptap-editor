<template>
  <div v-if="editor" class="editor">
    <editor-menu class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor"/>
  </div>
</template>
  
<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import EditorMenu from './EditorMenu.vue'

import PageExtension from "@/extensions/PageExtension.js"


export default {
  components: {
    EditorMenu,
    EditorContent,
  },

  data() {
    return {
      editor: null,
      prevHeight: 0,
      editorText: "",
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        PageExtension,
      ],
      content: `<editor-page />`,
      
      onUpdate({ editor }) {
        let editorHtml = editor.getHTML()
        let height = editor.view.dom.clientHeight
        console.log(height)

        if(height > this.prevHeight){
          if (height % 1000 > 0 && height % 1000 < 100) {
            editorHtml += `<editor-page />`
            editor.commands.setContent(editorHtml)
          }
        }
        else{
          let countOfPages = editor.view.dom.childElementCount
          if (height % 1000*countOfPages > 0 & height % 1000*countOfPages < 100)
          {
            editor.view.dom.removeChild(editor.view.dom.lastElementChild)
          }
        }
        this.prevHeight = height
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
  
<style lang="scss">
.editor {

  .editor__header{
    position: fixed;
    width: 100%;
    overflow: hidden;
    z-index: 2;
  }

  .editor__content{
    padding: 100px 20px 0;
    width: 100%;
    max-width: 1024px;
    margin:  0 auto;

    .ProseMirror {
      outline: none;
      overflow:hidden;

      &::-webkit-scrollbar {
        display: none;
      }


      ul,
      ol {
        padding: 0 1rem;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.1;
      }

      code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
      }

      pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.8rem;
        }
      }

      img {
        max-width: 100%;
        height: auto;
      }

      blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
      }

      hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
      }
    }
  }
}
</style>