import Editor from '@monaco-editor/react'
import { Language } from '../../types'

interface CodeEditorProps {
  code: string
  language: Language
  onChange: (code: string) => void
  readOnly?: boolean
}


const MONACO_LANG: Record<Language, string> = {
  javascript: 'javascript',
  python: 'python',
  cpp: 'cpp',
  java: 'java',
}

const CodeEditor = ({ code, language, onChange, readOnly = false }: CodeEditorProps) => {
  return (
    <div className="h-full rounded-lg overflow-hidden border border-gray-700">
      <Editor
        height="100%"
        language={MONACO_LANG[language]}
        value={code}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: '"Fira Code", "Cascadia Code", monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          readOnly,
          padding: { top: 12, bottom: 12 },
          lineNumbers: 'on',
          roundedSelection: true,
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
