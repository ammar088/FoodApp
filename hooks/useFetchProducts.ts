import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://simple-grocery-store-api.online/products';
const STORAGE_KEY = '@products_data';

const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                const productsWithImages = response.data.map((product: any, index: number) => ({
                    ...product,
                    imageUrl: [
                        "https://hips.hearstapps.com/hmg-prod/images/orange-1558624428.jpg",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-gXiIZVnIyo6CaTJ_1I3iq8EINJYgQnLuQ&s",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-y3QaiD_xxhD-f2iw_-dYL1w5dPdS-QaPA&s",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFO_itt5Yux9xPi58A5omfQvETfFhm5ub1Q&s"
                    ][index % 4], // Loop through the image URLs
                }));
                setProducts(productsWithImages);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(productsWithImages));
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products. Loading from cache.');
                const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
                if (cachedData) {
                    setProducts(JSON.parse(cachedData));
                }
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useFetchProducts;
