import styles from './TrustBar.module.css';

const trustItems = [
  { icon: '🧪', label: 'Third Party Tested' },
  { icon: '💯', label: 'Only Purity Guaranteed' },
  { icon: '🏭', label: 'GMP Manufactured' },
  { icon: '🔬', label: 'Research Peptides' },
];

export default function TrustBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {trustItems.map((item) => (
          <div key={item.label} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
