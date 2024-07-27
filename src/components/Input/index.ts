import DefaultInput from './DefaultInput';
import DropDownInput from './DropDownInput';
import PasswordInput from './PasswordInput';

const Input = Object.assign(DefaultInput, {
  Password: PasswordInput,
  DropDown: DropDownInput,
});

export default Input;
