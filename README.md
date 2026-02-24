# modern-react-json-editor
[![Sponsor](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github)](https://github.com/sponsors/felipecarrillo100)

A high-performance, professional React bridge for **Jos de Jong's** [vanilla-jsoneditor](https://github.com/josdejong/svelte-jsoneditor). Optimized for modern web applications that require fluid layouts, seamless theme switching, and zero-config integration.

## 🚀 Why This Wrapper?

While many integrations leave you fighting with CSS and height collapses, this library is engineered to "just work."

* **Integrated Dark Mode**: Support for `light` and `dark` themes is baked in. 
* **Layout Autonomy**: Container-aware by design. It inherits parent dimensions automatically, fitting perfectly into resizable sidebars, grid layouts, or modals.
* **Lossless Data Handling**: Support for custom JSON parsers (like `lossless-json`) to handle BigInts and high-precision decimals without rounding errors.
* **React 16.8 and higher**: A modern bridge that respects the React lifecycle, ensuring the editor instance is stable and ready from the moment your component mounts.
---

## Live sample

Check out this **React JSON Editor sandbox** for reference and samples:
[https://codesandbox.io/p/sandbox/modern-react-json-editor-2rgwk2](https://codesandbox.io/p/sandbox/modern-react-json-editor-2rgwk2)


## 📦 Installation

```bash
npm install modern-react-json-editor
```

---

## 📖 Integration

### Getting Started

The `ReactJsonEditor` is designed for **fluid layouts**. Simply ensure the parent has a defined height.

```tsx
import { useState } from 'react';
// Import the library
import { ReactJsonEditor, type Content } from 'modern-react-json-editor';
// Import styles (Import dark.css only if you use theme="dark")
import "modern-react-json-editor/index.css"; 
import "modern-react-json-editor/dark.css";

function App() {
  const [content, setContent] = useState<Content>({
    json: { status: "ready", message: "Hello from React!" }
  });

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactJsonEditor 
        theme="dark" 
        content={content} 
        onChange={(newContent) => setContent(newContent)} 
      />
    </div>
  );
}

```

---

## 🛠️ Advanced Capabilities

### 🛡️ JSON Schema Validation

Enforce strict data rules with real-time feedback. Provide a standard **JSON Schema** to get visual cues, red underlinings, and gutter icons for violations.

```tsx
import { ReactJsonEditor, createAjvValidator } from 'modern-react-json-editor';

const schema = {
  type: "object",
  properties: {
    system_port: { type: "integer", minimum: 1024 }
  },
  required: ["system_port"]
};

const validator = createAjvValidator({ schema });

// Use as <ReactJsonEditor validator={validator} ... />

```

### 💎 BigInt & Precision Handling (Lossless JSON)

Standard JavaScript JSON.parse silently rounds large numbers (e.g., a 64-bit Snowflake ID like 9223372036854775807 becomes 9223372036854776000). This leads to critical data corruption when saving back to a database.

By passing the parser prop, you can swap the internal JavaScript JSON parser for a high-precision parser like `lossless-json` to ensure your data remains 100% accurate.

```tsx
import { ReactJsonEditor } from 'modern-react-json-editor';
import { parse, stringify } from 'lossless-json';

const LosslessParser = { parse, stringify };

function HighPrecisionEditor() {
  return (
    <div style={{ height: '400px' }}>
      <ReactJsonEditor 
        content={{ text: '{"snowflake_id": 9223372036854775807}' }}
        parser={LosslessParser}    // Set your parser here
      />
    </div>
  );
}
```

---

## ⚙️ Props & Configuration

The component supports the full suite of `vanilla-jsoneditor` properties.

| Prop | Type | Description |
| --- | --- | --- |
| **`content`** | `Content` | The data to display (supports `{json: ...}` or `{text: ...}`). |
| **`mode`** | `Mode` | The editor mode: `tree`, `text`, or `table`. |
| **`theme`** | `'light' | 'dark'` | Toggles the visual theme. |
| **`validator`** | `Validator` | An AJV validator instance for schema enforcement. |
| **`parser`** | `JSONParser` | Custom parser (e.g. `LosslessJSON`) to handle BigInts. |
| **`readOnly`** | `boolean` | Set the editor to read-only mode. |
| **`mainMenuBar`** | `boolean` | Show or hide the main menu bar. |
| **`navigationBar`** | `boolean` | Show or hide the navigation/breadcrumb bar. |
| **`onChange`** | `function` | Callback when content is edited. |
| **`onChangeMode`** | `function` | Callback when the user switches editor modes. |
| **`queryLanguage`** | `QueryLanguage` | Integrated querying: `javascript`, `lodash`, `jmespath`, or `jsonpath`. |
| **`statusBar`** | `boolean` | Show or hide the status bar at the bottom. Default: `true`. |
| **`askToFormat`** | `boolean` | When `true`, prompts to format when a messy JSON string is pasted. |
| **`indentation`** | `number | string` | Number of spaces or the character used for indentation (e.g., `2`). |
| **`tabSize`** | `number` | The visual width of a tab character. |
| **`escapeControlCharacters`** | `boolean` | Whether to escape control characters in the text. |
| **`escapeUnicodeCharacters`** | `boolean` | Whether to escape unicode characters (e.g., emojis). |
| **`flattenColumns`** | `boolean` | In `table` mode, flattens nested objects into columns. |

> [!TIP]
> **Looking for the full API?**
> This component extends **[`svelte-jsoneditor/vanilla-jsoneditor`](https://github.com/josdejong/svelte-jsoneditor))**. You can use any native property listed in the official documentation directly as a prop.

---

## 🏗️ The Power-User Toolkit (Exports)

We provide a "Batteries Included" package. All core utilities and types are re-exported for a unified development experience.

### Logic & Utilities

* **Validation**: `createAjvValidator`, `createAjvValidatorAsync`
* **Querying**: `javascriptQueryLanguage`, `lodashQueryLanguage`, `jmespathQueryLanguage`, `jsonpathQueryLanguage`
* **Converters**: `toTextContent`, `toJSONContent` (useful for state transformations)

### TypeScript Support

* **State**: `Content`, `JSONContent`, `TextContent`
* **UI Hooks**: `MenuItem`, `OnRenderMenu`, `OnClassName`, `OnRenderValue`, `OnPatch`, `OnSelect`
* **Core Types**: `JSONParser`, `Validator`, `JSONSchema`, `ValidationError`

---

## 🎛️ Under the Hood Access

If you need to trigger an action programmatically, you can create a ref to the instance to get access to the inner workings of the JSON Editor. This grants full access to the **vanilla-jsoneditor** API, allowing you to invoke methods for advanced navigation, state orchestration, or custom UI interactions that sit outside the standard React props.

### Invoke Native Methods

By using `editorRef.current`, you can call the following methods directly:

* **`get()` / `set()`**: Data get or replace the entire editor content.
* **`patch(operations)`**: Apply granular changes using JSON Patch.
* **`update(content)`**: Partially update the current content.
* **`scrollTo(path)`**: Programmatically navigate to a specific key or index.
* **`expand(path)` / `collapse(path)`**: Control node visibility in tree mode.
* **`transform()`**: Open the modal for filtering, sorting, or transforming data.
* **`validate()`**: Manually trigger a validation pass.
* **`focus()`**: Shift browser focus to the editor.

---


```tsx
import { useRef } from 'react';
import { ReactJsonEditor, type JSONInstance } from 'modern-react-json-editor';

function ActionCenter() {
  const editorRef = useRef<JSONInstance>(null);

  const handleFormat = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const content = editor.get();
    // Logic: Convert current content to formatted text
    const json = 'json' in content ? content.json : JSON.parse(content.text);
    
    editor.set({
      text: JSON.stringify(json, null, 2)
    });
  };

  return (
    <div style={{ height: '500px' }}>
      <button onClick={handleFormat}>Format Document</button>
      <ReactJsonEditor ref={editorRef} content={{ json: { a: 1, b: [1,2,3] } }} />
    </div>
  );
}

```

---

## 🤝 Acknowledgments

This library is powered by the exceptional `vanilla-jsoneditor` engine by **Jos de Jong**.

## ⚖️ License

MIT

## Donations & Sponsoring
Creating and maintaining open-source libraries is a passion of mine. If you find this editor useful and it saves you time, please consider supporting its development. Your contributions help keep the project active and motivated!

Every bit of support—whether it's sponsoring on GitHub, a coffee, a star, or a shout-out, is deeply appreciated. Thank you for being part of the community!

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" name="buy-me-a-coffee" alt="Buy Me A Coffee" width="180">](https://buymeacoffee.com/felipecarrillo100)

[![Sponsor](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github)](https://github.com/sponsors/felipecarrillo100)

