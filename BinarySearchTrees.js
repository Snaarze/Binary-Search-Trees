import { Node } from "./Node.js";
import { merge, mergeSort } from "./sort.js";
class Tree {
  // initialized the object body
  constructor(array) {
    this.root = this.buildTree(mergeSort(array));
  }

  // this function return the root of the tree
  getRoot() {
    return this.root;
  }

  // this function build the tree as inbalanced
  buildTree(array, start = 0, end = array.length - 1) {
    let middlePointer = Math.floor((start + end) / 2);

    if (start > end) return null;

    let node = new Node(array[middlePointer]);

    node.left = this.buildTree(array, start, middlePointer - 1);
    node.right = this.buildTree(array, middlePointer + 1, end);
    return node;
  }

  // this function insert a value
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

  // this function delete a specific node
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

  // this function return the minimum number or nodes that can be found
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
    // traverse on node as long as there are node
    while (currentNode.length !== 0) {
      let firstNode = currentNode[0];
      console.log(callback(firstNode));
      if (firstNode.left !== null) {
        currentNode.push(firstNode.left);
      }
      if (firstNode.right !== null) {
        currentNode.push(firstNode.right);
      }

      currentNode.shift();
    }
  }

  preOrder(callback, root = this.root, array = []) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }
    if (root === null) return null;

    array.push(root.data);
    callback(array);
    this.preOrder(callback, root.left, array);
    this.preOrder(callback, root.right, array);
  }

  inOrder(callback, root = this.root, array = []) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (root === null) return;

    this.inOrder(callback, root.left, array);
    array.push(root.data);
    callback(array);
    this.inOrder(callback, root.right, array);
  }

  postOrder(callback, root = this.root, array = []) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (root === null) return null;

    this.postOrder(callback, root.left, array);
    this.postOrder(callback, root.right, array);
    array.push(root.data);
    callback(array);
  }

  // this functions logs the node as traversal method
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

  logs(node) {
    console.log(node);
  }

  height(value, root = this.find(value, this.getRoot())) {
    // if current root is  falsy value, return null
    if (!root) {
      return null;
    }
    // if root is null return -1
    if (root === null) {
      return -1;
    }

    let leftRoot = this.height(value, root.left);
    let rightRoot = this.height(value, root.right);

    return Math.max(leftRoot, rightRoot) + 1;
  }

  depth(value, root = this.getRoot(), counter = 0) {
    // root is null until the function traverse until the end of the tree
    // return null
    if (root === null) {
      return null;
    }
    // base case if valeu is equal to root.data
    // stop the recursive
    if (value === root.data) {
      return counter;
    }

    // if the value still havent found keep traversing
    if (value > root.data) {
      return this.depth(value, root.right, counter + 1);
    } else {
      return this.depth(value, root.left, counter + 1);
    }
  }

  isBalanced(root = this.getRoot()) {
    if (root === null) {
      return true;
    }

    let leftHeight = this.height(root, root.right);
    let rightheight = this.height(root, root.left);
    // if the height of leaf each node is greating than 1
    // return false
    if (leftHeight - rightheight > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  // this function  sort an unbalanced array to create balanced tree
  rebalanced(array = [], root = this.getRoot()) {
    if (root === null) {
      return root;
    }
    array.push(root.data);
    this.rebalanced(array, root.left);
    this.rebalanced(array, root.right);

    return (this.root = this.buildTree(mergeSort(array)));
  }

  find(value, root) {
    // if not found return null
    if (root === null) {
      return null;
    }

    // if found return the root
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

// this function generate random numbers upto 100 and return it as an array
const randomArray = (array = []) => {
  for (let i = 0; i < 100; i++) {
    array.push(Math.round(Math.random() * 100));
  }
  return array;
};

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
const tree = new Tree(randomArray());
console.log(prettyPrint(tree.getRoot()));
console.log(tree.isBalanced());
console.log(tree.preOrder(tree.logsTheNode));
console.log(tree.inOrder(tree.logsTheNode));
console.log(tree.postOrder(tree.logsTheNode));
tree.insert(tree.getRoot(), 103);
tree.insert(tree.getRoot(), 201);
tree.insert(tree.getRoot(), 105);
tree.insert(tree.getRoot(), 15);
console.log(tree.isBalanced());
tree.rebalanced();
console.log(tree.isBalanced());
console.log(prettyPrint(tree.getRoot()));
console.log(tree.preOrder(tree.logsTheNode));
console.log(tree.inOrder(tree.logsTheNode));
console.log(tree.postOrder(tree.logsTheNode));
console.log(tree.levelOrder(tree.logs));
