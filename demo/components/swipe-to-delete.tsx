import React from 'react';
import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
interface IRow {
  id: string;
  title: string;
}
const rows: IRow[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'First Item - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu ornare libero',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item - vel tempor nibh. Duis volutpat libero varius hendrerit scelerisque',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item - Nulla facilisi. Quisque at pellentesque ligula, et iaculis sapien',
  },
];
const renderRightActions = (
  progress: Animated.AnimatedInterpolation,
  dragX: Animated.AnimatedInterpolation,
) => {
  const opacity = dragX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.swipedRow}>
      <View style={styles.swipedConfirmationContainer}>
        <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
      </View>
      <Animated.View style={[styles.deleteButton, {opacity}]}>
        <TouchableOpacity>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const Item = (row: IRow) => (
  <Swipeable renderRightActions={renderRightActions}>
    <View style={styles.row}>
      <Text>{row.title}</Text>
    </View>
  </Swipeable>
);

export const SwipeToDelete: React.FunctionComponent<{}> = props => {
  const renderItem = (dataItem: IRow) => (
    <Item title={dataItem.title} id={dataItem.id} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={i => renderItem(i.item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#efefef',
    margin: 20,
    minHeight: 50,
  },
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});
