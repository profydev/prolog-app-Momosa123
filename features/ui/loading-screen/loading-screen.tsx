import styles from "./loading-screen.module.scss";
export function LoadingScreen() {
  return <div data-cy="loading-indicator" className={styles.circle}></div>;
}
