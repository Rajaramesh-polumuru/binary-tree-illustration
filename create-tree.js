function createBinaryTreeFromArray(arr) {
  if (arr.length === 0) {
    return null;
  }
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  let queue = [];
  let root = {
    name: arr[0],
    children: [],
    id: uid(),
  };
  queue.push(root);

  let i = 1;
  while (i < arr.length) {
    let currentNode = queue.shift();

    let leftChild = {
      name: arr[i],
      children: [],
      parentId: currentNode.id,
      id: uid(),
    };
    currentNode.children.push(leftChild);
    queue.push(leftChild);
    i++;

    if (i < arr.length) {
      let rightChild = {
        name: arr[i],
        children: [],
        parentId: currentNode.id,
        id: uid(),
      };
      currentNode.children.push(rightChild);
      queue.push(rightChild);
      i++;
    }
  }

  return root;
}
