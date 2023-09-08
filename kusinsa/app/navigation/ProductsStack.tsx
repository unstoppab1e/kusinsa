import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from '../screens/Products';

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
};

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

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
    </ProductsStack.Navigator>
  );
};

export default ProductsStackNav;