import DateInput from './DateInput';
import DefaultInput from './DefaultInput';
import DropDownInput from './DropDownInput';
import PasswordInput from './PasswordInput';

const Input = Object.assign(DefaultInput, {
  Password: PasswordInput,
  DropDown: DropDownInput,
  Date: DateInput,
});

export default Input;
