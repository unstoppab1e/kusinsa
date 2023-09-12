import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
};

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
export type ProductPageProps = NativeStackScreenProps<
  ProductsStackParamList,
  'Products'
>;
export type ProductDetailsProps = NativeStackScreenProps<
  ProductsStackParamList,
  'ProductDetails'
>;

const ProductsStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5E091A',
        },
      }}
    >
      <ProductsStack.Screen
        name='Products'
        component={Products}
        options={{ headerTitle: 'Kusinsa', headerTintColor: 'white' }}
      />
      <ProductsStack.Screen
        name='ProductDetails'
        component={ProductDetails}
        options={{ headerTitle: '', headerTintColor: 'white' }}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsStackNav;
