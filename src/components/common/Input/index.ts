import DateInput from './DateInput/dateInput';
import DefaultInput from './DefaultInput';
import DropdownInput from './DropdownInput/dropdownInput';
import PasswordInput from './PasswordInput';

const Input = Object.assign(DefaultInput, {
  Password: PasswordInput,
  Dropdown: DropdownInput,
  Date: DateInput,
});

export default Input;
