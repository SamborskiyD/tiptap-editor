<template>
  <div v-if="editor" class="editor">
    <editor-menu class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
  
<script>
import StarterKit from '@tiptap/starter-kit'
import Paragraph from '@tiptap/extension-paragraph'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { EditorState, TextSelection } from '@tiptap/pm/state'
import EditorMenu from './EditorMenu.vue'

import PageExtension from "@/extensions/PageExtension.js"
import { EditorView } from '@tiptap/pm/view'


export default {
  components: {
    EditorMenu,
    EditorContent,
    EditorState,
  },

  data() {
    return {
      editor: null,
      prevHeight: 0,
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        PageExtension,
      ],

      content: `
                <editor-page />`,


      onUpdate({ editor }) {


        let editorHtml = editor.getHTML()
        let editorJSON = editor.getJSON()

        let height = editor.view.dom.lastChild.querySelector(".content").clientHeight

        if (height > this.prevHeight) {
          if (height >= 912) {
            editorHtml += `<editor-page />`
            editor.commands.setContent(editorHtml)
          }
        }
        else {

        }

        for (let i = 0; i < editorJSON.content.length; i++) {
          console.log(height, this.prevHeight)
          if (height > this.prevHeight) {
            if (editor.view.dom.children[i].children[0].clientHeight > 912) {
              let lastParagraph = editorJSON.content[i].content.pop()
              editorJSON.content[i + 1].content.unshift(lastParagraph)
              editor.commands.setContent(editorJSON)
            }
          }
          else{
            if (editor.view.dom.children[i].children[0].clientHeight < 912 && editor.view.dom.children[i+1]){
              let firstPargaph = editorJSON.content[i+1].content.shift()
              editorJSON.content[i].content.push(firstPargaph)
              editor.commands.setContent(editorJSON)
            }
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

  .editor__header {
    position: fixed;
    width: 100%;
    overflow: hidden;
    z-index: 2;
  }

  .editor__content {
    padding: 100px 20px 0;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    .ProseMirror {
      outline: none;
      overflow: hidden;

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