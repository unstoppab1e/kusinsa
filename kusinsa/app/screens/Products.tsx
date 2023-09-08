import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  const renderProductItem = ({ item }) => (
    <View>
      <Text>{item.product_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderProductItem}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Products;
