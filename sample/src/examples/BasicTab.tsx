import { useState } from 'react';
import { ReactJsonEditor, type Content } from '../../../src';

export default function BasicTab({ theme }: { theme: 'dark' | 'light' }) {
    const [content, setContent] = useState<Content>({
        json: {
            status: "ready",
            data: [1, 2, 3],
            message: "Hello from React 19!"
        }
    });

    return (
        <div style={{ height: '100%' }}>
            <ReactJsonEditor
                theme={theme}
                content={content}
                onChange={(newContent) => setContent(newContent)}
                mainMenuBar={false}
                navigationBar={false}
                readOnly={true}
                statusBar={true}
                askToFormat={true}
                indentation={2}
            tabSize={8}
            escapeControlCharacters={true}
            escapeUnicodeCharacters={true}
            flattenColumns={true}
            />
        </div>
    );
}
