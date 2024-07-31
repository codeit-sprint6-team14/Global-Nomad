import Button from '@/components/Button';
import { TextareaWithSubmitProps } from '@/types/reviewModalTypes';

const TextareaWithSubmit = ({ text, onTextChange, onSubmit, isSubmitDisabled }: TextareaWithSubmitProps) => {
  return (
    <div>
      <textarea
        className="mb-24 w-full resize-none rounded-4 border border-gray-700 p-16 focus:border-black-100 focus:outline-none sm:h-346"
        placeholder="후기를 작성해주세요"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      ></textarea>

      <Button.Default
        className={`w-full sm:mb-33 md:mb-41 ${
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
