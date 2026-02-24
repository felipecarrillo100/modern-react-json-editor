import { useRef, useState } from 'react';
import { type JSONInstance, Mode, ReactJsonEditor } from '../../../src';

export default function AdvancedTab({ theme }: { theme: 'dark' | 'light' }) {
    const editorRef = useRef<JSONInstance>(null);
    const [mode, setMode] = useState<Mode>(Mode.text);

    const handleFormat = () => {
        const editor = editorRef.current;
        if (!editor) return;

        // Using the official .get() and .set() methods
        const content = editor.get();

        // The library handles the conversion between JSON and Text internally
        // when we pass the 'json' property back as 'text'.
        editor.set({
            // Convert current content (regardless of type) to formatted text
            text: JSON.stringify('json' in content ? content.json : JSON.parse(content.text), null, 2)
        });
    };

    const handleCompact = () => {
        const editor = editorRef.current;
        if (!editor) return;

        const content = editor.get();

        editor.set({
            // Convert current content (regardless of type) to compact text
            text: JSON.stringify('json' in content ? content.json : JSON.parse(content.text))
        });
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header disappears and space is reclaimed when mode !== Mode.text */}
            {mode === Mode.text && (
                <div style={{
                    padding: '10px',
                    display: 'flex',
                    gap: '10px',
                    background: '#374151'
                }}>
                    <button onClick={handleFormat}>Format Document</button>
                    <button onClick={handleCompact}>Compact</button>
                </div>
            )}

            <div style={{ flex: 1 }}>
                <ReactJsonEditor
                    ref={editorRef}
                    theme={theme}
                    mode={mode}
                    onChangeMode={(newMode) => setMode(newMode)}
                    content={{
                        json: {
                            info: "This sample uses official .get() and .set() methods",
                            items: [1, 2, 3]
                        }
                    }}
                />
            </div>
        </div>
    );
}
