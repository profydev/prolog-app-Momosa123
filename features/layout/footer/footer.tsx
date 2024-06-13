import styles from "./footer.module.scss";
import pjson from "../../../package.json";
import classNames from "classnames";
import Link from "next/link";
type Props = {
  footerClassName?: string;
};
export function Footer({ footerClassName }: Props) {
  return (
    <footer className={classNames(styles.footer, footerClassName)}>
      <ul className={styles.linkContainer}>
        <li>
          <Link href="#">Docs</Link>
        </li>
        <li>
          <Link href="#">API</Link>
        </li>
        <li>
          <Link href="#">Help</Link>
        </li>
        <li>
          <Link href="#">Community</Link>
        </li>
      </ul>
      <div className={styles.logoContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-small.svg" alt="logo" />
      </div>
      <div className={styles.version}>
        <p>version: {pjson.version}</p>
      </div>
    </footer>
  );
}
