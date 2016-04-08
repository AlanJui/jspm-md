# 摘要

嚐試架設「AngularJS 1.x + Angular Material + TypeScript + JSPM」開發平台。

# 事前準備

作業環境須先完成下列軟體之安裝：

 * git
 * node
 * npm
 * jspm (以 Global 型式安裝)
 * typings (以 Global 型式安裝)

以上之 npm 模組若有尚未完成安裝者，可參考下列之操作指引，完成應有之安裝:

## jspm 安裝

```
$ npm install -g jspm
```

## typing 安裝

```
 $ npm install -g typings
```

# 安裝作業

```
$ git clone git@github.com:AlanJui/jspm-md.git

$ cd jspm-md

$ npm install

$ jspm install

$ typings install
```

# 發展作業

```
 $ npm start
```

上述指令將啟動 Browser-Sync 軟體，與使用者作業環境中預設的瀏覽器，
顯示「網址：[http://localhost:3000](http://localhost:3000)」內容。

因 Browser-Sync 俱備 Live Reload 功能，所以，開發人員可以一邊編輯 HTML / CSS / TypeScript 
 檔案的內容;一邊觀察結果，依此方式進行軟體的發展工作。

# 參考資訊

## 使用 jspm 安裝軟體所需模組

```
 $ jspm install angular-material text json 
```

## 使用 typing 安裝 DTS 檔案


```
 $ typings install angular-material --ambient --save
```


