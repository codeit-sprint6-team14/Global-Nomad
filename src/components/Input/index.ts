import DateInput from './DateInput';
import DefaultInput from './DefaultInput';
import DropdownInput from './DropdownInput/DropdownInput';
import PasswordInput from './PasswordInput';

const Input = Object.assign(DefaultInput, {
  Password: PasswordInput,
  Dropdown: DropdownInput,
  Date: DateInput,
});

export default Input;
