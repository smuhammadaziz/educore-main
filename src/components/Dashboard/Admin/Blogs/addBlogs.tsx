import React, { FormEvent, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import backurl from '../../../../links';

import { stateToHTML } from 'draft-js-export-html';

import { RefObject, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentBlock,
  BlockMap,
} from 'draft-js';
import Toolbar from '../../../../editor/toolbar';
// import './DraftEditor.css';

import 'draft-js/dist/Draft.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewBlogAdmin() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const token = localStorage.getItem('TOKEN');

  const handleCancel = () => {
    // Clear all form data
    setName('');
    setDescription('');
    setPhoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a form data object
    const formData = new FormData();
    formData.append('title', name);
    formData.append('descr', description);
    if (photo) {
      formData.append('image', photo);
    }

    // console.log(formData);

    try {
      const response = await fetch(`${backurl}api/admin/add/blog`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Blog successfully added', {
          position: 'top-right',
        });
        handleCancel();
      }
    } catch (error: any) {
      console.error('Error submitting the form', error);
      toast.warning(error.message, {
        position: 'top-right',
      });
    }
  };

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
    <DefaultLayoutAdmin>
      <ToastContainer></ToastContainer>
      <div className="mb-5 text-left mx-auto text-2xl">
        {' '}
        Adding new <span className="underline">blog</span>
      </div>

      <div></div>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="p-6.5">
          <div className="">
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <div
                className="editor-wrapper border-2 bg-white dark:bg-black dark:border-white border-slate-200 w-2/2 h-100 overflow-x-hidden"
                onClick={focusEditor}
              >
                <div className="border-slate-200 border-b-2">
                  <Toolbar
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>
                <div className="editor-container p-2">
                  <Editor
                    ref={editor}
                    placeholder="Write Here"
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    customStyleMap={styleMap}
                    // blockStyleFn={myBlockStyleFn}
                    onChange={(newEditorState) => {
                      const contentState = newEditorState.getCurrentContent();
                      const rowFile = convertToRaw(contentState);

                      const plaintext = stateToHTML(contentState);
                      // console.log(plaintext);
                      setEditorState(newEditorState);
                      setDescription(plaintext);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4.5 md:w-1/2 px-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Photo (only one image)
              </label>
              <input
                type="file"
                className="w-full bg-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end mt-20">
            <a
              href="/dashboard/blogs"
              className="flex w-25 justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={handleCancel}
            >
              Cancel
            </a>
            <button
              type="submit"
              className="ms-5 flex w-25 justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </DefaultLayoutAdmin>
  );
}

export default AddNewBlogAdmin;
