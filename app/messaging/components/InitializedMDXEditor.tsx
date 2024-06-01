"use client"

// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react"
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor"

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="min-h-36 w-full overflow-y-auto rounded-md border-2 border-gray-200 p-2"
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        tablePlugin(),
        linkDialogPlugin({
          linkAutocompleteSuggestions: [
            "https://virtuoso.dev",
            "https://mdxeditor.dev",
          ],
        }),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve("https://picsum.photos/200/300")
          },
          imageAutocompleteSuggestions: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200",
          ],
        }),

        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
              <InsertCodeBlock />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
