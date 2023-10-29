# WYSA LeetCode Challenge - Valid Binary Search Tree

## Problem Statement:

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

### Definition of a Valid BST:

A valid BST is a binary tree where:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

## Examples:

**Example 1:**

Input: `[2,1,3]`

Output: `true`

Explanation: 
- The tree follows the BST properties: left subtree of 2 contains 1 (1 < 2), and the right subtree contains 3 (3 > 2).

**Example 2:**

Input: `[5,1,4,null,null,3,6]`

Output: `false`

Explanation: 
- The root node's value is 5, but its right child's value is 4, which violates the BST property.

## Approach:

1. **Reading the Problem:**
   - Understand the BST property: left subtree of a node <= node's key, and right subtree >= node's key.
   - Both left and right subtrees must also be BSTs.

2. **Example Analysis:**
   - Analyze provided examples to understand the problem requirements and constraints clearly.

3. **Approach:**
   - Utilize recursion to traverse the tree.
   - Maintain minimum and maximum values for each node to ensure it satisfies BST properties.
   - If a node's value is not within the valid range (min, max), return false.
   - Recursively check left subtree with updated maximum value and right subtree with updated minimum value.
   - If both subtrees are valid BSTs, the entire tree is a valid BST.

4. **Code:**

```javascript
var isValidBST = function(root, min = null, max = null) {
    if (!root) return true;
    
    if ((min !== null && root.val <= min) || (max !== null && root.val >= max)) {
        return false;
    }
    
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
};
