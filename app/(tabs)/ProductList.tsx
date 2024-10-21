import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, Dimensions } from 'react-native';
import useFetchProducts from '../../hooks/useFetchProducts';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

const screenWidth = Dimensions.get('window').width;

const ProductList = () => {
    const { products, loading, error } = useFetchProducts() as { products: Product[], loading: boolean, error: string | null };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Set to 2 columns to match the design
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: screenWidth / 2 - 30, // Adjust width to fit two columns
        alignItems: 'center',
        elevation: 3, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },
});

export default ProductList;
