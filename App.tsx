/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState, FC} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Main />
    </SafeAreaView>
  );
};

interface ITree {
  [key: string]: INode;
}
interface INode {
  id: string;
  counter: number;
  kids: string[];
}

const rootNode: INode = {
  id: '0',
  counter: 0,
  kids: [],
};

let counterN = 0;

type TNode = {
  id: string;
  tree: ITree;
  setTree: (value: ITree) => void;
};

const Node: FC<TNode> = ({id, tree, setTree}) => {
  const addNode = () => {
    counterN++;
    let xxx = {
      ...tree,
      [counterN.toString()]: {id: counterN.toString(), counter: 0, kids: []},
    };
    let yyy = xxx[id].kids;
    xxx[id].kids = [...yyy, counterN.toString()];
    setTree({...xxx});
    console.log('tree: ', tree);
  };

  const increment = () => {
    let xxx = tree;
    xxx[id].counter++;
    setTree({...xxx});
  };

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
          onPress={() => addNode()}>
          <Text style={{fontSize: 12, color: 'blue'}}>Add node</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => increment()}>
          <Text style={{fontSize: 12, color: 'blue'}}>Increment</Text>
        </TouchableOpacity>
      </View>
      {tree[id].kids.map((uid: string) => (
        <Node id={uid} tree={tree} setTree={setTree} key={uid} />
      ))}
    </View>
  );
};

const Main = () => {
  const [tree, setTree] = useState<ITree>({
    ['0']: rootNode,
  });

  const renderNode = useMemo(
    () => <Node id={'0'} setTree={setTree} tree={tree} />,
    [tree, setTree],
  );

  return <View style={{padding: 20, flex: 1}}>{renderNode}</View>;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default App;
