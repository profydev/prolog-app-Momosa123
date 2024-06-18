/* eslint-disable @next/next/no-img-element */

import styles from "./fetch-error.module.scss";

type Props = {
  page: string;
  refetch: () => void;
};
export function FetchError({ page, refetch }: Props) {
  return (
    <div data-cy="fetching-error" className={styles.messageContainer}>
      <div className={styles.textContainer}>
        <img src="/icons/alert-circle.svg" alt="" />
        <p>There was a problem while loading the {page} data</p>
      </div>
      <button onClick={refetch} className={styles.retryButton}>
        Try again
        <img src="/icons/arrow-right.svg" alt="" />
      </button>
    </div>
  );
}
//const refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Project[], Error>>
