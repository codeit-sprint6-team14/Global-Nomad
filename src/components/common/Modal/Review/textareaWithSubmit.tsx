import Button from '@/components/common/Button';
import { TextareaWithSubmitProps } from '@/types/reviewModalTypes';

const TextareaWithSubmit = ({ content, onContentChange, onSubmit, isSubmitDisabled }: TextareaWithSubmitProps) => {
  return (
    <div>
      <textarea
        className="mb-24 w-full resize-none rounded-4 border border-gray-700 p-16 focus:border-black-100 focus:outline-none sm:h-346 md:h-240"
        placeholder="후기를 작성해주세요"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      ></textarea>
      <Button.Default
        className={`w-full sm:mb-33 sm:h-54 md:mb-41 md:h-56 ${
          isSubmitDisabled ? 'cursor-not-allowed bg-gray-500 text-gray-200' : 'text-white hover:bg-gray-800'
        }`}
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      >
        작성하기
      </Button.Default>
    </div>
  );
};

export default TextareaWithSubmit;
