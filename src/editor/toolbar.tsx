import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faChevronDown,
  faChevronUp,
  faCode,
  faHighlighter,
  faItalic,
  faListOl,
  faListUl,
  faQuoteRight,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faTextWidth,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { EditorState, RichUtils } from 'draft-js';

interface ToolbarProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

interface Tool {
  label: string;
  style: string;
  icon: JSX.Element;
  method: 'inline' | 'block';
}

const Toolbar: React.FC<ToolbarProps> = ({ editorState, setEditorState }) => {
  const tools: Tool[] = [
    {
      label: 'bold',
      style: 'BOLD',
      icon: <FontAwesomeIcon icon={faBold} />,
      method: 'inline',
    },
    {
      label: 'italic',
      style: 'ITALIC',
      icon: <FontAwesomeIcon icon={faItalic} />,
      method: 'inline',
    },
    {
      label: 'underline',
      style: 'UNDERLINE',
      icon: <FontAwesomeIcon icon={faUnderline} />,
      method: 'inline',
    },
    {
      label: 'Unordered-List',
      style: 'unordered-list-item',
      method: 'block',
      icon: <FontAwesomeIcon icon={faListUl} transform="grow-6" />,
    },
    {
      label: 'Ordered-List',
      style: 'ordered-list-item',
      method: 'block',
      icon: <FontAwesomeIcon icon={faListOl} transform="grow-6" />,
    },
    {
      label: 'Code Block',
      style: 'CODEBLOCK',
      icon: <FontAwesomeIcon icon={faCode} transform="grow-3" />,
      method: 'inline',
    },
    {
      label: 'Uppercase',
      style: 'UPPERCASE',
      icon: <FontAwesomeIcon icon={faChevronUp} transform="grow-3" />,
      method: 'inline',
    },
    {
      label: 'lowercase',
      style: 'LOWERCASE',
      icon: <FontAwesomeIcon icon={faChevronDown} transform="grow-3" />,
      method: 'inline',
    },
  ];

  const applyStyle = (
    e: React.MouseEvent,
    style: string,
    method: 'inline' | 'block',
  ) => {
    e.preventDefault();
    method === 'block'
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style: string, method: 'inline' | 'block') => {
    if (method === 'block') {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className="toolbar-grid border-0 border-black grid grid-cols-8 border-b-2">
      {tools.map((item, idx) => (
        <button
          style={{
            color: isActive(item.style, item.method)
              ? 'rgba(0, 0, 0, 1)'
              : 'rgba(0, 0, 0, 0.3)',
          }}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
          className="py-2 px-4 border-b-4 border-2 border-black"
        >
          {item.icon || item.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
