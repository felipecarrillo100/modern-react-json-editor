// Working version!!!
import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { createJSONEditor } from 'vanilla-jsoneditor';
import type { JSONEditorPropsOptional } from 'vanilla-jsoneditor';

// The actual instance type from the library
export type JSONInstance = ReturnType<typeof createJSONEditor>;

export interface ReactJsonEditorProps extends JSONEditorPropsOptional {
    id?: string;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    theme?: 'light' | 'dark';
}

export const ReactJsonEditor = forwardRef<JSONInstance, ReactJsonEditorProps>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Use state for the instance instead of a Ref + Tick.
    // This naturally triggers the re-sync of useImperativeHandle.
    const [editor, setEditor] = useState<JSONInstance | null>(null);

    // 2. The handle now depends on the editor state.
    // It will update from null to the instance automatically.
    useImperativeHandle(ref, () => editor as JSONInstance, [editor]);

    useEffect(() => {
        if (!containerRef.current) return;

        const { id, title, className, style, theme, ...initialProps } = props;

        const instance = createJSONEditor({
            target: containerRef.current,
            props: initialProps
        });

        setEditor(instance);

        return () => {
            instance.destroy();
            setEditor(null);
        };
    }, []);

    // 3. Sync props when the editor exists
    useEffect(() => {
        if (editor) {
            const { id, title, className, style, theme, ...restProps } = props;
            editor.updateProps(restProps);
        }
    }, [props, editor]);

    const themeClass = props.theme === 'dark' ? 'jse-theme-dark' : 'jse-theme-light';

    return (
        <div
            id={props.id}
            title={props.title}
            ref={containerRef}
            className={`jse-react-wrapper ${themeClass} ${props.className || ''}`}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                position: 'relative',
                ...props.style
            }}
        />
    );
});

ReactJsonEditor.displayName = 'ReactJsonEditor';
