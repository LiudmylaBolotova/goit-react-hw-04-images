import { Circles } from 'react-loader-spinner';
import style from '../Loader/Loader.module.css';

export const Loader = () => {
  return (
    <Circles
      height="150"
      width="150"
      color="blue"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass={style.loader}
      visible={true}
    />
  );
};
