import Skeleton from '../common/Skeleton';
import coverStyles from './cover-images/cover-images.module.scss';
import featureStyles from './package-features/package-description.module.scss';
// import itineraryStyles from './itinerary/itinerary.module.scss';

const PackageSkeleton = () => {
    return (
        <div style={{ paddingBottom: '50px', }}>
            {/* Cover Images Skeleton */}
            <section className={coverStyles.coverImages}>
                <div className={coverStyles.container}>
                    <div className={coverStyles.mainGrid}>
                        {/* Large Image */}
                        <div className={`${coverStyles.imageCard} ${coverStyles.largeImage}`}>
                            <Skeleton width="100%" height="100%" borderRadius="0" />
                        </div>

                        {/* Small Images Grid */}
                        <div className={coverStyles.smallGrid}>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`${coverStyles.imageCard} ${coverStyles.smallImage}`}>
                                    <Skeleton width="100%" height="100%" borderRadius="0" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Description Skeleton */}
            <div className={featureStyles.packageContainer}>
                <div className={featureStyles.locationInfo}>
                    <h1 className={featureStyles.title}>
                        <Skeleton width="80%" height="100%" />
                    </h1>
                </div>
                <div className={featureStyles.packageInfo}>
                    <div className={featureStyles.tripDaysInfo}>
                        <Skeleton width="100px" height="24px" />
                    </div>
                    <div className={featureStyles.routeBreakdown}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={featureStyles.routeContainer}>
                                <Skeleton width="150px" height="24px" />
                            </div>
                        ))}
                    </div>
                    <div className={featureStyles.stayCategory} style={{ backgroundColor: 'transparent', padding: 0 }}>
                        <Skeleton width="120px" height="32px" borderRadius="2rem" />
                    </div>
                </div>
                <hr className={featureStyles.divider} />
                <div className={featureStyles.features}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={featureStyles.feature}>
                            <Skeleton width="140px" height="40px" borderRadius="8px" />
                        </div>
                    ))}
                </div>
                <hr className={featureStyles.divider} />
                {/* <div>
                    <label style={{ fontSize: '16px', fontWeight: 'normal', color: '#090909' }}>
                        Destination Routes
                    </label>
                </div>
                <div className={featureStyles.featuresDestinations} style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0, display: 'block' }}>
                    <Skeleton width="100%" height="50px" borderRadius="10px" />
                </div> */}
            </div>

            {/* <div className={itineraryStyles.itineraryContainer}>
                <div className={itineraryStyles.itineraryContent}>
                    <div>
                        <label style={{ fontSize: '16px', fontWeight: 'normal', color: '#090909' }}>
                            Trip Duration
                        </label>
                    </div>

                    <div className={itineraryStyles.tabs}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={itineraryStyles.tab} style={{ border: 'none', background: 'none' }}>
                                <Skeleton width="80px" height="30px" borderRadius="20px" />
                            </div>
                        ))}
                    </div>
                    <div className={itineraryStyles.tabContent} style={{ background: 'transparent', boxShadow: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '15px', overflow: 'hidden' }}>
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} width="200px" height="150px" borderRadius="12px" />
                                ))}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Skeleton width="100%" height="60px" borderRadius="8px" />
                                <Skeleton width="100%" height="60px" borderRadius="8px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default PackageSkeleton;
