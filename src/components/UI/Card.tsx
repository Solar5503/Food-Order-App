import styles from './Card.module.scss';

interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
