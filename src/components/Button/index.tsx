import DefaultButton from './defaultButton';
import CategoryButton from './categoryButton';

const Button = Object.assign(DefaultButton, {
  Category: CategoryButton,
});

export default Button;
