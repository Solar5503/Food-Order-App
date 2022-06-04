import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.scss';
import HeaderCartButton from './HeaderCartButton';

interface IHeaderProps {
  onShowCart: () => void;
}

const Header = ({ onShowCart }: IHeaderProps) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
