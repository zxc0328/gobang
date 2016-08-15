## 五子棋

[DEMO](https://zxc0328.github.io/gobang/)

### Build

```
npm install
npm run build
```

### Watch

```
npm run watch
```

### 多种View实现

如要实现Canvas渲染版本，新建CanvasView.js，继承`View.js`中的`View`类，实现`renderChess`，`renderChessBoard`和`initAddChess`三个方法。函数原型如下：

````
void renderChess(row:Number, col:Number) 
void renderChessBoard()
void initAddChess()
void reset()
void gameOver(Bool:flag)
void initUI()
````

其中`initAddChess`方法需要调用 `super.initAddChess`：

```
// row是行数，col是列数，playerFlag是玩家标识
void initAddChess(row:Number, col:Number, Bool:playerFlag)
```

`initUI`需要调用`super.initUI`

### 技术细节

用到了观察者模式、MVC、ES6、高阶函数等相关技术。



