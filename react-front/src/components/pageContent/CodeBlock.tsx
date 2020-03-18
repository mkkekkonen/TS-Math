import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
  value: string
  language?: string
}

export const CodeBlock = ({ value, language }: Props) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={atelierForestLight}
      showLineNumbers
    >
      {value}
    </SyntaxHighlighter>
  );
}
