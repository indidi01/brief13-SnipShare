// frontend/src/components/molecules/CodeBlock/CodeBlock.tsx
import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Copy } from 'lucide-react';
import styles from './CodeBlock.module.css';

export interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = false,
  maxHeight,
}) => {
  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          icon={<Copy size={16} />}
        >
          Copier
        </Button>
      </div>
      
      <div className={styles.codeWrapper} style={{ maxHeight }}>
        <pre className={styles.pre}>
          {showLineNumbers ? (
            <div className={styles.withLineNumbers}>
              <div className={styles.lineNumbers}>
                {lines.map((_, index) => (
                  <span key={index} className={styles.lineNumber}>
                    {index + 1}
                  </span>
                ))}
              </div>
              <code className={styles.codeContent}>{code}</code>
            </div>
          ) : (
            <code className={styles.code}>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
};