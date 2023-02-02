import style from 'components/Button/Button.module.css';
import propTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={style.button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};
