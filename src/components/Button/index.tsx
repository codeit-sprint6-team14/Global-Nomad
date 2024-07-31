import CategoryButton from './categoryButton';
import DefaultButton from './defaultButton';

const Button = Object.assign(DefaultButton, {
  Category: CategoryButton,
});

export default Button;
