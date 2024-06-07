import styles from "./footer.module.scss";
import pjson from "../../../package.json";
export function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <p className={styles.version}>version: {pjson.version}</p>
      </div>
      <div className={styles.linkContainer}>
        <a href="#">Docs</a>
        <a href="#">API</a>
        <a href="#">Help</a>
        <a href="#">Community</a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/logo-small.svg" alt="logo" className={styles.logo} />
    </div>
  );
}
