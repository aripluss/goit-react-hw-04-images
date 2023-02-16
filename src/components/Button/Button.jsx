import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export const Button = ({ handleLoadMore = () => {} }) => {
  return (
    <ButtonStyled type="button" onClick={handleLoadMore}>
      Load More
    </ButtonStyled>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
