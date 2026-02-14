import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { TableKit } from "@tiptap/extension-table";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  List, ListOrdered, Quote, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon,
  Highlighter, Undo, Redo, Minus, Upload, Type, Palette,
  Table, TableProperties, Rows3, Columns3, Trash2,
  Subscript as SubIcon, Superscript as SuperIcon,
  RemoveFormatting, Pilcrow, WrapText
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogRichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const MenuButton = ({ onClick, active, children, title, disabled }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string; disabled?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-1.5 rounded transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);

const COLORS = [
  "#000000", "#374151", "#6b7280", "#9ca3af",
  "#ef4444", "#f97316", "#eab308", "#84cc16",
  "#22c55e", "#14b8a6", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#ec4899", "#f43f5e",
];

const BlogRichTextEditor = ({ content, onChange }: BlogRichTextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline cursor-pointer' } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full mx-auto my-4 shadow-sm' }, allowBase64: false }),
      Placeholder.configure({ placeholder: "Start writing your blog post... Use the toolbar or select text for quick formatting." }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      TableKit.configure({
        table: {
          HTMLAttributes: { class: 'border-collapse border border-border w-full my-4' },
        },
        tableCell: {
          HTMLAttributes: { class: 'border border-border p-2 min-w-[80px]' },
        },
        tableHeader: {
          HTMLAttributes: { class: 'border border-border p-2 bg-muted/50 font-semibold min-w-[80px]' },
        },
      }),
      Subscript,
      Superscript,
      Typography,
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[500px] p-6 focus:outline-none [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-4 [&_table]:border-collapse [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted/50',
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of Array.from(items)) {
            if (item.type.startsWith("image/")) {
              event.preventDefault();
              const file = item.getAsFile();
              if (file) handleImageUpload(file);
              return true;
            }
          }
        }
        // Allow HTML paste to preserve formatting (spaces, lines, lists) from PDFs/pages
        const html = event.clipboardData?.getData("text/html");
        if (html) return false; // let tiptap handle HTML paste natively
        return false;
      },
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, { contentType: file.type });

    if (error) {
      console.error("Upload failed:", error.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    editor.chain().focus().setImage({ src: publicUrl }).run();
    setUploading(false);
  }, [editor]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    e.target.value = "";
  }, [handleImageUpload]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const setTextColor = useCallback((color: string) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setShowColorPicker(false);
  }, [editor]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    setShowTableMenu(false);
  }, [editor]);

  if (!editor) return null;

  const ToolbarGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-0.5 px-1 border-r border-border last:border-r-0">{children}</div>
  );

  const chars = editor.storage.characterCount?.characters() ?? 0;
  const words = editor.storage.characterCount?.words() ?? 0;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileSelect} />

      {/* Toolbar Row 1 */}
      <div className="flex flex-wrap items-center gap-0 p-2 border-b border-border bg-muted/30 sticky top-0 z-10">
        <ToolbarGroup>
          <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)"><Undo className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)"><Redo className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} title="Paragraph"><Type className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1"><Heading1 className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)"><Bold className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)"><Italic className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)"><UnderlineIcon className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript"><SubIcon className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript"><SuperIcon className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight"><Highlighter className="w-4 h-4" /></MenuButton>
          <div className="relative">
            <MenuButton onClick={() => { setShowColorPicker(!showColorPicker); setShowTableMenu(false); }} title="Text Color"><Palette className="w-4 h-4" /></MenuButton>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-card border border-border rounded-lg shadow-lg z-20 grid grid-cols-4 gap-1.5 w-[120px]">
                {COLORS.map(color => (
                  <button key={color} type="button" className="w-5 h-5 rounded-full border border-border hover:scale-125 transition-transform" style={{ backgroundColor: color }} onClick={() => setTextColor(color)} />
                ))}
                <button type="button" className="w-5 h-5 rounded-full border-2 border-dashed border-border bg-background text-[10px] flex items-center justify-center hover:scale-125 transition-transform col-span-4 w-full rounded-md" onClick={() => { editor.chain().focus().unsetColor().run(); setShowColorPicker(false); }}>
                  Reset Color
                </button>
              </div>
            )}
          </div>
          <MenuButton onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear Formatting"><RemoveFormatting className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left"><AlignLeft className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center"><AlignCenter className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right"><AlignRight className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List"><ListOrdered className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote"><Quote className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block"><Code className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule"><Minus className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setHardBreak().run()} title="Line Break"><WrapText className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <div className="relative">
            <MenuButton onClick={() => { setShowTableMenu(!showTableMenu); setShowColorPicker(false); }} active={editor.isActive("table")} title="Table"><Table className="w-4 h-4" /></MenuButton>
            {showTableMenu && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-card border border-border rounded-lg shadow-lg z-20 w-48 space-y-1">
                <button type="button" onClick={insertTable} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                  <Table className="w-3.5 h-3.5" /> Insert 3×3 Table
                </button>
                {editor.isActive("table") && (
                  <>
                    <div className="border-t border-border my-1" />
                    <button type="button" onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <Columns3 className="w-3.5 h-3.5" /> Add Column After
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().addColumnBefore().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <Columns3 className="w-3.5 h-3.5" /> Add Column Before
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2 text-destructive">
                      <Columns3 className="w-3.5 h-3.5" /> Delete Column
                    </button>
                    <div className="border-t border-border my-1" />
                    <button type="button" onClick={() => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <Rows3 className="w-3.5 h-3.5" /> Add Row After
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().addRowBefore().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <Rows3 className="w-3.5 h-3.5" /> Add Row Before
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2 text-destructive">
                      <Rows3 className="w-3.5 h-3.5" /> Delete Row
                    </button>
                    <div className="border-t border-border my-1" />
                    <button type="button" onClick={() => { editor.chain().focus().mergeCells().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <TableProperties className="w-3.5 h-3.5" /> Merge Cells
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().splitCell().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <TableProperties className="w-3.5 h-3.5" /> Split Cell
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().toggleHeaderRow().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2">
                      <TableProperties className="w-3.5 h-3.5" /> Toggle Header Row
                    </button>
                    <div className="border-t border-border my-1" />
                    <button type="button" onClick={() => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false); }} className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center gap-2 text-destructive">
                      <Trash2 className="w-3.5 h-3.5" /> Delete Table
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuButton onClick={setLink} active={editor.isActive("link")} title="Insert Link"><LinkIcon className="w-4 h-4" /></MenuButton>
          <MenuButton onClick={triggerFileInput} title="Upload Image" disabled={uploading}>
            <Upload className={`w-4 h-4 ${uploading ? 'animate-pulse' : ''}`} />
          </MenuButton>
          <MenuButton onClick={addImageByUrl} title="Image from URL"><ImageIcon className="w-4 h-4" /></MenuButton>
        </ToolbarGroup>
      </div>

      {/* Upload indicator */}
      {uploading && (
        <div className="px-4 py-2 bg-primary/10 text-primary text-sm flex items-center gap-2 border-b border-border">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Uploading image...
        </div>
      )}

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} className="flex items-center gap-0.5 p-1 bg-card border border-border rounded-lg shadow-elevated">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight"><Highlighter className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={setLink} active={editor.isActive("link")} title="Link"><LinkIcon className="w-3.5 h-3.5" /></MenuButton>
        <div className="w-px h-4 bg-border mx-0.5" />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List"><ListOrdered className="w-3.5 h-3.5" /></MenuButton>
        <div className="w-px h-4 bg-border mx-0.5" />
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2"><Heading2 className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3"><Heading3 className="w-3.5 h-3.5" /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote"><Quote className="w-3.5 h-3.5" /></MenuButton>
      </BubbleMenu>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{words} words</span>
          <span>{chars} characters</span>
          <span>~{Math.max(1, Math.ceil(words / 200))} min read</span>
        </div>
        <span>Drag & drop or paste images · Ctrl+B/I/U for formatting</span>
      </div>
    </div>
  );
};

export default BlogRichTextEditor;
