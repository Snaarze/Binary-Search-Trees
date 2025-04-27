import { Node } from "./Node.js";
import { mergeSort } from "./sort.js";
class Tree {
  constructor(array) {
    this.root = this.buildTree(mergeSort(array));
  }

  getRoot() {
    return this.root;
  }

  buildTree(array, start = 0, end = array.length - 1) {
    let middlePointer = Math.floor((start + end) / 2);

    if (start > end) return null;

    let node = new Node(array[middlePointer]);

    node.left = this.buildTree(array, start, middlePointer - 1);
    node.right = this.buildTree(array, middlePointer + 1, end);
    return node;
  }

  insert(root, key) {
    if (root === null) {
      return new Node(key);
    }

    if (root.data === key) {
      return root;
    }

    if (key < root.data) {
      root.left = this.insert(root.left, key);
    } else {
      root.right = this.insert(root.right, key);
    }
    return root;
  }

  delete(root, value) {
    if (root === null) return null;

    if (value < root.data) {
      // if root.left is less then go left
      root.left = this.delete(root.left, value);
    } else if (value > root.data) {
      // if root.right is greater than value then go right
      root.right = this.delete(root.right, value);
    } else {
      // if either side is null, return their oposite side
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Node has two children
      let successor = this.findMin(root.right);
      root.data = successor.data;
      root.right = this.delete(root.right, successor.data);
    }

    return root;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  levelOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Error no callback function is passed");
    }
    if (node === null) {
      return;
    }

    let currentNode = [];
    currentNode.push(node);
    while (currentNode.length !== 0) {
      let firstNode = currentNode[0];
      console.log(callback(firstNode.data));
      if (firstNode.left !== null) {
        currentNode.push(firstNode.left);
      }
      if (firstNode.right !== null) {
        currentNode.push(firstNode.right);
      }

      currentNode.shift();
    }
  }

  preOrder(callback, root, array = []) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }
    if (root === null) return null;

    array.push(root.data);
    callback(array);
    this.preOrder(callback, root.left, array);
    this.preOrder(callback, root.right, array);
  }

  inOrder(callback, root, array = []) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (root === null) return;

    this.inOrder(callback, root.left, array);
    array.push(root.data);
    callback(array);
    this.inOrder(callback, root.right, array);
  }

  postOrder(callback, root, array = []) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (root === null) return null;

    this.postOrder(callback, root.left, array);
    this.postOrder(callback, root.right, array);
    array.push(root.data);
    callback(array);
  }

  logsTheNode(node) {
    let balanced = "";

    node.forEach((item) => {
      if (item === node[node.length - 1]) {
        return (balanced += item);
      }
      balanced += item + " -> ";
    });

    console.log(balanced);
  }

  height(value, node) {
    let data = this.find(value, node);
    let leftCounter = 0;
    let rightCounter = 0;
    while (data.left !== null) {
      data.left;
    }
  }

  find(value, root) {
    if (root === null) {
      return null;
    }
    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
// const tree = new Tree([10, 20, 30, 32, 34, 36, 50, 40, 60, 65, 70, 75, 80, 85]);
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(tree.getRoot(), 2);
tree.insert(tree.getRoot(), 28);
tree.insert(tree.getRoot(), 22);
tree.insert(tree.getRoot(), 15);
tree.insert(tree.getRoot(), 42);
tree.insert(tree.getRoot(), 13);
tree.insert(tree.getRoot(), 87);
tree.insert(tree.getRoot(), 6);
tree.insert(tree.getRoot(), 99);
tree.insert(tree.getRoot(), 55);
tree.insert(tree.getRoot(), 300);
tree.insert(tree.getRoot(), 43);
tree.insert(tree.getRoot(), 4000);
tree.delete(tree.getRoot(), 324);
// console.log(tree.find(2, tree.getRoot()));
// tree.postOrder(tree.logsTheNode, tree.getRoot());
// tree.inOrder(tree.logsTheNode, tree.getRoot());
// tree.preOrder(tree.logsTheNode, tree.getRoot());
console.log(tree.height(2, tree.getRoot()));
console.log(prettyPrint(tree.getRoot()));
