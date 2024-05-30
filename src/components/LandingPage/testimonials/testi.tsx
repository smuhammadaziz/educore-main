import Brand from '../../../images/brand/brand.svg';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentBlock,
} from 'draft-js';
import Toolbar from '../../../editor/toolbar';
// import './DraftEditor.css';

import 'draft-js/dist/Draft.css';

export default function Testimonials() {
  const [selectledLang] = useLang();

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            key: '3eesq',
            text: 'Sample text',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 19,
                length: 6,
                style: 'BOLD',
              },
              {
                offset: 25,
                length: 5,
                style: 'ITALIC',
              },
              {
                offset: 30,
                length: 8,
                style: 'UNDERLINE',
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
    ),
  );

  const editor = useRef<Editor>(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current?.focus();
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // FOR INLINE STYLES
  const styleMap: { [key: string]: React.CSSProperties } = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: '#F7A5F7',
    },
    UPPERCASE: {
      textTransform: 'uppercase',
    },
    LOWERCASE: {
      textTransform: 'lowercase',
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: 'inherit',
      background: '#ffeff0',
      fontStyle: 'italic',
      lineHeight: 1.5,
      padding: '0.3rem 0.5rem',
      borderRadius: ' 0.2rem',
    },
    SUPERSCRIPT: {
      verticalAlign: 'super',
      fontSize: '80%',
    },
    SUBSCRIPT: {
      verticalAlign: 'sub',
      fontSize: '80%',
    },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock: ContentBlock): string | undefined => {
    const type = contentBlock.getType();
    switch (type) {
      case 'blockQuote':
        return 'superFancyBlockquote';
      case 'leftAlign':
        return 'leftAlign';
      case 'rightAlign':
        return 'rightAlign';
      case 'centerAlign':
        return 'centerAlign';
      case 'justifyAlign':
        return 'justifyAlign';
      default:
        return undefined;
    }
  };
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 mt-20">
      <div
        className="editor-wrapper border-4 border-black w-150"
        onClick={focusEditor}
      >
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
        <div className="editor-container">
          <Editor
            ref={editor}
            placeholder="Write Here"
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            customStyleMap={styleMap}
            // blockStyleFn={myBlockStyleFn}
            onChange={(newEditorState) => {
              const contentState = newEditorState.getCurrentContent();
              console.log(convertToRaw(contentState));
              setEditorState(newEditorState);
            }}
          />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto lg:max-w-4xl">
        <img
          className="justify-center mx-auto"
          src={Brand}
          alt="Brand logo"
          width="300"
        />
        <figure className="mt-10">
          <h3 className="text-center text-5xl font-extrabold mb-5">
            {content[selectledLang as string].testi.heading}
          </h3>
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>{content[selectledLang as string].testi.text}</p>
          </blockquote>
          <figcaption className="mt-10">
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">EDUCORE™️</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
