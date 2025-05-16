import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SIZES } from '../Constants/Theme';
import ProductItems from './ProductItems';
import { AuthContext } from '../Context/context';

const Card = ({ handleNavigate }) => {
  const { filteredProducts, products } = useContext(AuthContext);

  const dataToRender = filteredProducts?.length > 0 ? filteredProducts : products;


  return (
    <View style={styles.container}>
      <FlatList
        data={dataToRender}
        renderItem={({ item }) => (
          <ProductItems
            title={item?.name}
            imageFile={item?.file}
            price={item?.price}
            handleNavigate={() => handleNavigate(item._id, item.price)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.width * 0.09,
    marginLeft: "5.5%"
  },
});

export default Card;