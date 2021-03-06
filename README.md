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

$ npm run setup
```


# 發展作業

依循下述「操作程序」，以「自動化」模式，進行 Web App 發展作業。

## 1. 啟動「自動化」發展作業模式 

### 1.1 啟動 MongoDB Server

在終端機輸入下列指令:

```
 $ npm run db 
```

### 1.2 啟動「自動編譯」功能 
 
在終端機輸入下列指令:
 
``` 
 $ gulp
```

## 2. 瀏覽 Web App 

### 2.1.a 啟動 Web Server

無需針對程式碼除錯（Debug）時，以如下指令啟動 Web Server 。

```
 $ gulp serve:build
```

### 2.1.b 啟動偵錯用 Web Server

```
在 WebStorm 以「Debug」指令，執行 Run Server 。
```

### 2.2 瀏覽輸出

使用瀏覽器，觀看網址: **http://localhost:20080** ，觀察 Web App 的輸出結果，確認 Web App 已能正常執行。

## 3. 發展 Web App

### 3.1 編輯原始程式

```
使用編輯器 (IDE/Editor) ，執行 Web App 發展工作，並自瀏覽器觀察 Web App 輸出結果。
```

### 3.2 驗證編輯

```
在執行「gulp」的終端機視窗，觀察輸出結果，確認沒有任何「編輯的錯誤」。
```

### 3.2 驗證輸出

```
自瀏覽器觀察輸出結果，確認輸出結果符合「編輯的期許」。
```

# 產品包裝作業

將已完成發展，產出的「工作產品」，進行軟體包裝，並置於目錄路徑: **_build**
之中。

```
 $ gulp dist
```

上述指令執行完畢，可自瀏覽器，網址: http://localhost:3000 處，進行軟體產品操作使用。



# 檢視產品

```
 $ gulp serve:dist
```
上述指令執行完畢，可自瀏覽器，網址: http://localhost:3000 處，進行軟體產品操作使用。



# 測試作業

## 單元測試（UT）作業

 1. 啟動測試伺服器
 
    ```
     $ gulp serve:test
    ```
    
 2. 執行測試   
 
   ```
    $ gulp ut
   ```

## 整合測試（IT）作業

 1. 啟動測試伺服器
 
    ```
     $ gulp serve:test
    ```
    
 2. 執行測試   
 
   ```
    $ gulp it
   ```


# 佈署作業

將已完成包裝的「軟體產品」，佈署至 GitHub 。

```
 $ gulp deploy
```

完成佈署之後，可至下列網址操作使用:

[http://alanjui.github.io/jspm-md](http://alanjui.github.io/jspm-md)



# 狀況排除

執行作業指令，如: `gulp` 或 `gulp build` ，卻遭遇異常狀況，無法正常執行。
這問題很可能導因於下列之模組/檔案，尚未安裝: 
 
 * `npm 模組` 
 * `jspm 模組`
 * `DTS 檔案` 
 
該問題的發生時機，經常會是在完成 `git pull` 指令之後，故若遇有上述之狀況時，
可透過以下之指令，完成事先應有之安裝工作。

```
$ npm run setup
```


# 參考資訊

## 使用 jspm 安裝軟體所需模組

```
 $ jspm install angular-material text json 
 $ jspm install typescript core-js
 $ jspm install angular angular-animate angular-aria angular-messages angular-resource angular-ui-router 
 $ jspm install npm:angular-material-icons 
 
 $ jspm install typescript --dev
```

## 使用 typings 安裝 DTS 檔案

```
 $ typings install angular-material --ambient --save
 $ typings install angular --ambient --save
 $ typings install angular-ui-router --ambient --save
```

## 人工手動模式 Web App 發展作業

依循下述「操作程序」，以「人工手動」模式，進行 Web App 發展作業。

## 1. 啟動 TypeScript 自動編譯功能 

```
 $ npm run dev
```

## 2. 瀏覽 Web App 

透過以下指令，啟動 Browser-Sync 瀏覽發展中的 Web App 。

```
 $ npm run serve:dev
```

上述指令將啟動 Browser-Sync 軟體，與使用者作業環境中預設的瀏覽器，
於「網址：[http://localhost:3000](http://localhost:3000)」觀察 Web App 內容。

## 3. 發展 Web App

上述操作程序 1 及 2 完成後，可以開始使用編輯器 (IDE/Editor) 進行 Web App 發展的相關工作。

由於 Browser-Sync 俱備 Live Reload 功能，且已設定啟動 wtach 功能，
所以，對於 HTML / CSS / TypeScript 檔案的編輯動作，可立即自瀏覽器觀察其輸出結果。

# Inject LESS

```
#myApp {

  html, body {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* inject:less-imports */
  /* endinject */

}
```

## 終止佔用某 Port 的 Process

### 查詢佔用某 Port 的 Process 其 PID

```
 $ netstat -anp tcp | grep 3000
```

Mac OSX El Capitan

```
 $ lsof -i [tcp]:3000
```

## 透過 PID 終止 Process

```
 $ kill -9 <PID>
```
