import { useEffect, useState } from 'react';
import CoverImages from './cover-images';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PackageDescription from './package-features';
import Itinerary from './itinerary';

const Package = () => {
  const { id, agencyId, userId }: any = useParams<{
    id: string;
    agencyId: string;
    userId: string;
  }>();
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  console.log('URL Params:', { id, agencyId, userId });

  const searchPackageDetails = async (
    id: number,
    agencyId: number,
    userId: number
  ) => {
    const response = await axios.post(
      'https://crm.peakinsight.in/packages/search/details',
      {
        requestId: '0d0fe4d2-28f7-4f27-9533-a817617f578f',
        payload: {
          id,
          agencyId,
          userId,
        },
      }
    );

    console.log(response.data, 'response.data');
    setPackageDetails(response?.data?.body);
  };

  const extractImageUrls = (data: any[]) => {
    const destinations: string[] = [];
    const activities: string[] = [];

    data.forEach((day) => {
      if (day.images) {
        day.images.forEach((image: any) => {
          destinations.push(image.imageUrl);
        });
      }

      if (day.activities) {
        day.activities.forEach((activity: any) => {
          if (activity.images) {
            activity.images.forEach((image: any) => {
              activities.push(image.imageUrl);
            });
          }
        });
      }
    });

    return { destinations, activities };
  };

  useEffect(() => {
    searchPackageDetails(id, agencyId, userId);
  }, []);

  useEffect(() => {
    if (packageDetails?.days) {
      const { destinations, activities } = extractImageUrls(
        packageDetails?.days
      );
      console.log(
        destinations,
        activities,
        destinations.length,
        activities.length
      );
      setDestinations(destinations);
      setActivities(activities);
    }
  }, [packageDetails]);

  return (
    <div>
      <CoverImages destinations={destinations} activities={activities} />
      <PackageDescription packageDetails={packageDetails} />
      <Itinerary itineraryData={packageDetails?.days} />
    </div>
  );
};

export default Package;
