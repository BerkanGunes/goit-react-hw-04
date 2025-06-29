import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage; 