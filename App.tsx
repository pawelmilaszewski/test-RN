/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, FC, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch, Provider} from 'react-redux';
import {ITree, increment, addNode} from './redux/reducer';
import {RootState, store} from './redux/store';

const App = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Provider store={store}>
        <Main />
      </Provider>
    </SafeAreaView>
  );
};

type TNode = {
  id: string;
  tree: ITree;
};

const Node: FC<TNode> = ({id, tree}) => {
  const dispatch = useDispatch();

  return (
    <View style={{marginLeft: 20}} key={id}>
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          alignItems: 'center',
        }}>
        <View>
          <Text>ID: {id}</Text>
          <Text>Counter: {tree[id].counter}</Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 12,
          }}
          onPress={() => dispatch(addNode(id))}>
          <Text style={{fontSize: 12, color: 'blue'}}>Add node</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => dispatch(increment(id))}>
          <Text style={{fontSize: 12, color: 'blue'}}>Increment</Text>
        </TouchableOpacity>
      </View>
      {tree[id].kids.map((uid: string) => (
        <Node id={uid} tree={tree} key={uid} />
      ))}
    </View>
  );
};

const Main = () => {
  const tree = useSelector((state: RootState) => state.tree);
  useEffect(() => {
    console.log('tree: ', tree);
  }, [tree]);

  const renderNode = useMemo(() => <Node id={'0'} tree={tree} />, [tree]);

  return <View style={{padding: 20, flex: 1}}>{renderNode}</View>;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default App;
