/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

let nodesCounter = 0;

const App = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Main />
    </SafeAreaView>
  );
};

type NodeType = {
  id: number;
  counter: number;
  children: NodeType[];
};

class Node {
  counter: number;
  id: number;
  children: NodeType[];

  constructor(c: number) {
    this.children = [];
    this.counter = 0;
    this.id = c;
  }
  increment() {
    this.counter++;
  }
  addNode() {
    nodesCounter++;
    const temp = new Node(nodesCounter);
    this.children.push(temp);
  }
}

const Main = () => {
  const nodes = [] as NodeType[];

  const a = new Node(nodesCounter);
  nodesCounter++;
  const b = new Node(nodesCounter);
  nodesCounter++;
  const c = new Node(nodesCounter);
  nodesCounter++;
  const d = new Node(nodesCounter);
  nodesCounter++;
  const e = new Node(nodesCounter);

  nodes.push(a);

  a.children.push(b);
  a.children.push(c);
  b.children.push(d);
  b.children.push(e);

  useEffect(() => {
    console.log('node: ', nodes);
  }, [nodes]);

  useEffect(() => {
    console.log('a: ', a);
  }, [a]);

  const addNode = (node: any) => {
    node.addNode();
    console.log('after add node: ', node);
  };

  const increment = (node: any) => {
    node.increment();
    console.log('after increment node: ', node);
  };

  const addNodeToMain = () => {
    let temp = new Node(nodesCounter);
    return nodes.push(temp);
  };

  const renderNodes = (values: NodeType[]) => {
    return values.map((item: NodeType) => {
      return (
        <View style={{marginLeft: 20}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 8,
              alignItems: 'center',
            }}>
            <View>
              <Text>ID: {item.id}</Text>
              <Text>Counter: {item.counter}</Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 12,
              }}
              onPress={() => addNode(item)}>
              <Text style={{fontSize: 12, color: 'blue'}}>Add node</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => increment(item)}>
              <Text style={{fontSize: 12, color: 'blue'}}>Increment</Text>
            </TouchableOpacity>
          </View>
          {renderNodes(item.children)}
        </View>
      );
    });
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <Text>Hello</Text>
      <TouchableOpacity
        style={{
          padding: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={addNodeToMain}>
        <Text style={{fontSize: 12, color: 'blue'}}>Add node</Text>
      </TouchableOpacity>
      {renderNodes(nodes)}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default App;
