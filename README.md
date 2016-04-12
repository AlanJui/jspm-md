# 專案指引

架設「AngularJS 1.x + Angular Material + TypeScript + JSPM」開發平台。

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

## typings 安裝

```
 $ npm install -g typings
```

# 安裝作業

依循以下之操作程序，完成本專案作業環境之安裝作業。

```
$ git clone git@github.com:AlanJui/jspm-md.git

$ cd jspm-md

$ npm install

$ jspm install

$ typings install
```

# 發展作業

依循下述「操作程序」，進行 Web App 發展作業。

## 1. 啟動 tsc 

```
 $ npm run dev
```

## 2. 啟動 Web App

```
 $ npm start
```

上述指令將啟動 Browser-Sync 軟體，與使用者作業環境中預設的瀏覽器，
於「網址：[http://localhost:3000](http://localhost:3000)」觀察 Web App 內容。

## 3. 發展 Web App

上述操作程序 1 及 2 完成後，可以開始使用編輯器 (IDE/Editor) 進行 Web App 發展的相關工作。

由於 Browser-Sync 俱備 Live Reload 功能，且已設定啟動 wtach 功能，
所以，對於 HTML / CSS / TypeScript 檔案的編輯動作，可立即自瀏覽器觀察其輸出結果。

# 產品包裝作業

將已完成發展，產出的「工作產品」，進行軟體包裝，並置於目錄路徑: **_build**
之中。

```
 $ gulp build
```

# 檢視產品

```
 $ gulp build:serve
```

# 佈署作業

將已完成包裝的「軟體產品」，佈署至 GitHub 。

```
 $ gulp deploy
```

完成佈署之後，可至下列網址操作使用:

(http://alanjui.github.io/jspm-md)[http://alanjui.github.io/jspm-md]



# 參考資訊

## 使用 jspm 安裝軟體所需模組

```
 $ jspm install angular-material text json 
```

## 使用 typings 安裝 DTS 檔案


```
 $ typings install angular-material --ambient --save
```


