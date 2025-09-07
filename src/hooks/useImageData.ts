// src/hooks/useImageData.ts
import { useState, useEffect } from 'react';

// Define types for better TypeScript support
interface ImageData {
    images_count_summary: {
        all_images: number;
        destination_images: number;
        property_images: number;
        activity_images: number;
        product_images: number;
    };
    [key: string]: any; // For dynamic category keys
}

interface UseImagesDataReturn {
    imagesData: ImageData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useImagesData = (): UseImagesDataReturn => {
    const [imagesData, setImagesData] = useState<ImageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async () => {

        console.log('callifn ');

        try {
            setLoading(true);
            setError(null); // Reset error state

            const response = await fetch('/images.json');

            console.log('response', response);


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Validate data structure
            if (!data || !data.images_count_summary) {
                throw new Error('Invalid data structure received');
            }

            setImagesData(data);
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to load images';
            setError(errorMessage);
            console.error('Image fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    // Return refetch function for manual retry
    const refetch = () => {
        fetchImages();
    };

    return { imagesData, loading, error, refetch };
};