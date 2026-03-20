import styles from './QualitySection.module.css';

const verificationSteps = [
  { label: 'Molecular Lab Test', status: 'Pass' },
  { label: 'External Validation', status: 'Pass' },
  { label: 'Quality Certification', status: 'Pass' },
];

const qualityPoints = [
  {
    icon: '🔬',
    title: 'Internal Validation',
    desc: 'Meticulous internal testing during synthesis ensures precision, stability, and molecular shelf purity prior to final housing.',
  },
  {
    icon: '🔗',
    title: 'Chain of Custody',
    desc: 'Secure, temperature-controlled logistics from our research facility, maintaining sterile air-tight research housing.',
  },
];

export default function QualitySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h3 className={styles.leftHeading}>Verification Methodology</h3>
          <p className={styles.leftDesc}>
            Every batch undergoes rigorous quality control.
            Each compound is validated by independent third-party labs.
          </p>
          <div className={styles.steps}>
            {verificationSteps.map(step => (
              <div key={step.label} className={styles.step}>
                <span className={styles.stepCheck}>✓</span>
                <span className={styles.stepLabel}>{step.label}</span>
                <span className={styles.stepStatus}>{step.status}</span>
              </div>
            ))}
          </div>
          <span className={styles.downloadLink}>Download Latest COA ↓</span>
        </div>

        <div className={styles.right}>
          <span className={styles.rightLabel}>Quality Control</span>
          <h3 className={styles.rightHeading}>
            Precision Synthesis.{'\n'}Absolute Accountability.
          </h3>
          <div className={styles.points}>
            {qualityPoints.map(point => (
              <div key={point.title} className={styles.point}>
                <span className={styles.pointIcon}>{point.icon}</span>
                <div>
                  <span className={styles.pointTitle}>{point.title}</span>
                  <p className={styles.pointDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
