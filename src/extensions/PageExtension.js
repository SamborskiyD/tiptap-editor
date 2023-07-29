import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
 
import EditorPage from '@/components/EditorPage.vue'

export default Node.create({
  name: 'EditorPage',
  group: 'block',
  content: 'block+',
  marks: "_",
  isolating: true,
  
  parseHTML() {
    return [
      {
        tag: 'editor-page',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['editor-page', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(EditorPage)
  },
})