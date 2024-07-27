import DefaultInput from './DefaultInput'
import PasswordInput from './PasswordInput'
import DropDownInput from './DropDownInput'

const Input = Object.assign(DefaultInput, {
  Password: PasswordInput,
  DropDown: DropDownInput,
})

export default Input
