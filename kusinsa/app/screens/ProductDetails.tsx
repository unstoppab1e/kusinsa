import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProductDetailsProps } from '../navigation/ProductsStack';
import { Product, getProductDetails } from '../api/api';
import useCartStore from '../state/cartStore';
import { Ionicons } from '@expo/vector-icons';

const ProductDetails = ({ route }: ProductDetailsProps) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const { products, addProduct, removeProduct } = useCartStore((state) => ({
    products: state.products,
    addProduct: state.addProduct,
    removeProduct: state.removeProduct,
  }));
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const productIndex = products.find((item) => item.id === id);
    if (productIndex) {
      setQuantity(productIndex.quantity);
    } else {
      setQuantity(0);
    }
  }, [quantity]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image
            style={styles.productImage}
            source={{ uri: product?.product_image }}
          />
          <View style={styles.divider} />
          <View style={styles.info}>
            <Text style={styles.productName}>{product?.product_name}</Text>
            <Text style={styles.productCategory}>
              {product?.product_category}
            </Text>
            <Text style={styles.productDescription}>
              {product?.product_description}
            </Text>
            <Text style={styles.productPrice}>${product?.product_price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name='remove' size={24} color={'red'} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.button}>
              <Ionicons name='add' size={24} color={'green'} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  productItem: {
    flex: 1,
    margin: 10,
  },
  productImage: {
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
    height: 300,
    borderRadius: 10,
  },
  productPrice: {
    marginTop: 8,
    fontSize: 24,
    color: '#5E091A',
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 24,
    marginTop: 8,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray', // You can set any color you prefer
    width: '100%', // Adjust the width as needed
    marginVertical: 8, // Adjust the margin as needed
  },
  info: {
    marginTop: 20,
    padding: 20,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    borderColor: '#5E091A',
    borderWidth: 2,
  },
  quantity: {
    fontSize: 20,
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetails;
