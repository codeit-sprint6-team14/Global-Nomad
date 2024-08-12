import React, { ChangeEvent, forwardRef } from 'react';

interface TextAreaProps {
  placeholder?: string;
  value?: string;
  error?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, value, error = false, onChange, className = '' }, ref) => {
    const baseStyle = `resize-none w-full h-346 pt-16 pl-16 outline-none placeholder:text-gray-600 text-lg-regular border-gray-700 rounded-4 pl-16 pr-40 border focus:border-[1.5px]`;
    const styleClass = `${baseStyle} ${error ? 'errorBorder' : 'normalBorder'} ${className}`;

    return <textarea ref={ref} className={styleClass} placeholder={placeholder} value={value} onChange={onChange} />;
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
