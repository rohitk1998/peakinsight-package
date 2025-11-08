import { icons } from './icons';
import styles from './package-description.module.scss';

interface PackageFeaturesProps {
  packageDetails: any;
}

const PackageFeatures = ({ packageDetails }: PackageFeaturesProps) => {
  return (
    <div className={styles.packageContainer}>
      <div className={styles.locationInfo}>
        <h1 className={styles.title}>{packageDetails?.title}</h1>
      </div>
      <div className={styles.packageInfo}>
        <div className={`${styles.tripDaysInfo}`}>
          {packageDetails?.duration}
        </div>
        <div className={styles.routeBreakdown}>
          {packageDetails?.routeBreakdown.map((route: any) => (
            <div className={styles.routeContainer}>
              <span className={styles.routeDays}>
              {route.days} 
              </span>
              <div className={styles.des}>
              <span>{ route?.days > 1 ? 'days' : 'day' } in </span>
              <span className={styles.location}>{route.location}</span>
              </div>
            </div>
          ))}
        </div>
         <div className={`${styles.stayCategory}`}>
          {packageDetails?.stayCategory}
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.features}>
        {packageDetails?.included?.map((feature: any) => (
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
            {icons[feature.split(' ')[0]]}
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <hr className={styles.divider} />
      <div>
        <label style={{ fontSize: '16px', fontWeight: 'normal',color: '#090909' }}>
          Destination Routes
        </label>
      </div>
      <div className={styles.featuresDestinations}>
        {packageDetails?.destinationRoute?.map((feature: any, index: number) => (
          <div className={styles.featureDestination}>
            <p>{feature}</p>
            {index !== packageDetails?.destinationRoute?.length - 1 && (
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
