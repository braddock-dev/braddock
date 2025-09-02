import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.skeleton}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <div className={styles.backIcon} />
            <div className={styles.agendaText} />
          </div>
          <div className={styles.shareButton} />
        </div>

        <div className={styles.content}>
          <div className={styles.configPanel}>
            <div className={styles.mainTitle} />
            <div className={styles.tabs}>
              <div className={styles.tab} />
              <div className={styles.tab} />
              <div className={styles.onlineToggle} />
            </div>

            <div className={styles.sections}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.section}>
                  <div className={styles.sectionLabel} />
                  <div className={styles.sectionContent} />
                </div>
              ))}
            </div>

            <div className={styles.actionButtons}>
              <div className={styles.button} />
              <div className={styles.button} />
            </div>
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.previewTitle} />
            <div className={styles.bookingPreview}>
              <div className={styles.previewHeader} />
              <div className={styles.bookingCard}>
                <div className={styles.bookingTitle} />
                <div className={styles.bookingSubtitle} />
                <div className={styles.servicesList}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={styles.serviceItem} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
