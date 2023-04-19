# Currino

[![npm version](https://img.shields.io/npm/v/currino.svg?style=flat-square)](https://www.npmjs.com/package/currino)
[![npm downloads](https://img.shields.io/npm/dm/currino.svg?style=flat-square)](http://npm-stat.com/charts.html?package=currino)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/currino/dist/currino.umd.cjs?compression=gzip&label=gzip%20size:%20JS)](https://unpkg.com/currino/dist/currino.umd.cjs)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

函数式风格的 TypeScript 实用工具库

## 📦 安装

通过 npm:

```bash
npm install currino
```

通过 unpkg CDN:

```html
<script src="https://unpkg.com/currino@0.0.3/dist/currino.iife.js"></script>
```

## 🔨 使用

ESM:

```javascript
import { sum } from 'currino';
```

Node.JS:

```javascript
const { sum } = require('currino');
```

Browser:

```javascript
Currino.sum(1, 1);
```

## 📚 API

### 列表

#### forEach

```javascript
forEach(iteratee, arrayLink);
```

调用 `iteratee` 遍历 `arrayLink` 中的每个元素， iteratee 调用 3 个参数： (value, index, arrayLink)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。

**参数**

iteratee (Function): 每次迭代调用的函数。

arrayLink (ArrayLink): 一个用来迭代的列表。

**返回**

(\*): 返回列表 `arrayLink`。

**示例**

```javascript
forEach(
  (value) => {
    console.log(value);
  },
  [1, 2]
);
// => 输出 '1' 和 '2'。
```

#### forEachRight

```javascript
forEachRight(iteratee, arrayLink);
```

这个方法类似 `forEach`，不同之处在于，`forEachRight`是从右到左遍历每一个元素。

**参数**

iteratee (Function): 每次迭代调用的函数。

arrayLink (ArrayLink): 一个用来迭代的列表。

**返回**

(\*): 返回列表 `arrayLink`。

**示例**

```javascript
forEachRight(
  (value) => {
    console.log(value);
  },
  [1, 2]
);
// => 输出 '2' 和 '1'。
```

### 对象

#### mapKeys

```javascript
mapKeys(mapping, object);
```

这个方法创建一个对象，对象的值与`object`相同，并且 key 是通过`mapping`每个自身可枚举属性的字符串产生的。如果`mapping`是个函数，那么它调用 3 个参数：(value, key, object)。

**参数**

mapping (Object|Function): 每次迭代时获取 key 的映射。

object (Object): 一个用来迭代的对象。

**返回**

(\*): 返回新对象。

**示例**

```javascript
mapKeys({ b: 'c' }, { a: 1, b: 2 });
// => { a: 1, c: 2 }

mapKeys(
  (value, key) => {
    return key + value;
  },
  { a: 1, b: 2 }
);
// => { a1: 1, a2: 2 }
```

### 树

#### eachTree

```javascript
eachTree(iteratee, childrenKey, tree);
```

以深度优先的方式，调用 `iteratee` 遍历 `tree`（集合） 中的每个节点， iteratee 调用 3 个参数： (node, path, tree)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。

**参数**

iteratee (Function): 每次迭代调用的函数。

childrenKey (string): 子节点属性名。

tree (Object): 一个用来迭代的树。

**返回**

(\*): 返回树 `tree`。

**示例**

```javascript
const tree = {
  id: 1,
  children: [
    {
      id: 2,
      children: [{ id: 4 }],
    },
    { id: 3 },
  ],
};

eachTree(
  (node) => {
    console.log(node);
  },
  'children',
  tree
);
// => 依次输出 { id: 1 } 、{ id: 2 } 、{ id: 4 } 、{ id: 3 }。
```

#### findTree

```javascript
findTree(predicate, childrenKey, tree);
```

遍历 `tree`（树）节点，返回 `predicate`（断言函数）第一个返回真值的第一个元素。predicate 调用 1 个参数： (node)。

**参数**

predicate (Function): 每次迭代调用的函数。

childrenKey (string): 子节点属性名。

tree (Object): 一个用来迭代的树。

**返回**

(\*): 返回匹配节点，否则返回`undefined`。

**示例**

```javascript
const tree = {
  id: 1,
  children: [{ id: 2 }],
};

findTree((node) => node.id === 2, 'children', tree);
// => 输出 { id: 2 }。
```

#### mapTree

```javascript
mapTree(iteratee, childrenKey, tree);
```

创建一个树，节点是`iteratee`遍历`tree`中的每个节点后返回的结果。iteratee 调用 1 个参数：(node)。

**参数**

iteratee (Function): 每次迭代调用的函数。

childrenKey (string): 子节点属性名。

tree (Object): 一个用来迭代的树。

**返回**

(\*): 返回新的映射后树。

**示例**

```javascript
const tree = {
  id: 1,
  children: [{ id: 2 }],
};

mapTree((node) => ({ key: node.id, children: node.children }), 'children', tree);
// => 输出 { key: 1, children: [{ key: 2 }] }。
```

#### searchTree

```javascript
searchTree(predicate, childrenKey, tree);
```

遍历 `tree`（树）节点，返回 `predicate`（断言函数）所有匹配节点的路径。predicate 调用 1 个参数： (node)。

**参数**

predicate (Function): 每次迭代调用的函数。

childrenKey (string): 子节点属性名。

tree (Object): 一个用来迭代的树。

**返回**

(\*): 返回匹配节点的路径节点，否则返回空数组。

**示例**

```javascript
const tree = {
  id: 1,
  children: [
    { id: 2 },
    {
      id: 3,
      children: [{ id: 4 }],
    },
  ],
};

searchTree((node) => node.id === 4, 'children', tree);
// => 输出 { id: 1, children: [{ id: 3, children: [{ id: 4 }] }] }。
```

### 函子

#### Identity

```javascript
Identity(value);
```

创建一个基础 Functor。

**参数**

value (\*): 容器内的值。

**返回**

(\*): 返回 `Functor`。

**示例**

```javascript
Identity(1)
  .map((x) => x + 1)
  .fold((x) => x);
// => 2
```

#### Maybe

这个方法类似 `Identity` ，不同之处在于，`Maybe` 可以处理空值。

**参数**

value (\*): 容器内的值。

**返回**

(\*): 返回 `Maybe`。

**示例**

```javascript
Maybe(null)
  .map((x) => x + 1)
  .fold((x) => x);
// => null
```

#### Either

Either 内部有两个值：左值（`Left`）和右值（`Right`）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

**参数**

left (\*): 左值。

right (\*): 右值。

**返回**

(\*): 返回 `Either`。

**示例**

```javascript
Either(1, 2)
  .map((x) => x + 1)
  .fold((x) => x);
// => 3

Either(1, null)
  .map((x) => x + 1)
  .fold((x) => x);
// => 1
```
