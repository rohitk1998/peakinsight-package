import styles from './package-description.module.scss';

interface PackageFeaturesProps {
  packageDetails: any;
}

const PackageFeatures = ({ packageDetails }: PackageFeaturesProps) => {
  console.log(packageDetails, 'packageDetails');
  return (
    <div className={styles.packageContainer}>
      <div className={styles.locationInfo}>
        <h1 className={styles.title}>{packageDetails?.packageName}</h1>
      </div>
      <div className={styles.packageInfo}>
        <div className={`${styles.tripDaysInfo}`}>
          {packageDetails?.noOfDays} days / {packageDetails?.noOfNights} nights
        </div>
        <div>Package Category : {packageDetails?.packageType}</div>
        <div>Stay Category : {packageDetails?.stayCategory}</div>
      </div>
      <div>
        <label style={{ fontSize: '20px', fontWeight: 'normal',color: '#090909' }}>
          Inclusions
        </label>
      </div>
      <div className={styles.features}>
        {packageDetails?.inclusions?.map((feature: any) => (
          <div className={styles.feature}>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div>
        <label style={{ fontSize: '20px', fontWeight: 'normal',color: '#090909' }}>
          Destination Routes
        </label>
      </div>
      <div className={styles.featuresDestinations}>
        {packageDetails?.destinations?.map((feature: any, index: number) => (
          <div className={styles.featureDestination}>
            <p>{feature}</p>
            {index !== packageDetails?.destinations?.length - 1 && (
              <svg
                className={styles.arrow}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageFeatures;
