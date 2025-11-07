import { useEffect, useState } from 'react';
import CoverImages from './cover-images';
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import PackageDescription from './package-features';
import Itinerary from './itinerary';
import data from "../../data.json"

const Package = () => {
  const { id, agencyId, userId }: any = useParams<{
    id: string;
    agencyId: string;
    userId: string;
  }>();
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [imagesByCategory,setImagesByCategory]=useState<any>({
    all : [] , 
    stays:[],
    activities:[]
  });


  const searchPackageDetails = async (
    id: number,
    agencyId: number,
    userId: number
  ) => {
    // const response = await axios.post(
    //   'https://crm.peakinsight.in/packages/search/details',
    //   {
    //     requestId: '0d0fe4d2-28f7-4f27-9533-a817617f578f',
    //     payload: {
    //       id,
    //       agencyId,
    //       userId,
    //     },
    //   }
    // );

    const response = {
      data:data
    };
    setPackageDetails(response?.data?.body);
  };

  const setImageAllbums = (data: any) => {
        setImagesByCategory({
          all : [ ...data?.allDayImages  ,...data?.allStayImages ,...data?.allActivityImages ],
          stays : [ ...data?.allStayImages ],
          activities : [ ...data?.allActivityImages ]
        })
  };

  useEffect(() => {
    searchPackageDetails(id, agencyId, userId);
  }, []);

  useEffect(() => {
    if (packageDetails) {
      setImageAllbums(packageDetails);
    }
  }, [packageDetails]);

  return (
    <div>
      <CoverImages imagesByCategory={imagesByCategory} />
      <PackageDescription packageDetails={packageDetails} />
      <Itinerary packageDetail={packageDetails} />
    </div>
  );
};

export default Package;
