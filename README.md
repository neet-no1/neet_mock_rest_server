# neet_mock_rest_server
JSONServerのテンプレート

## 用途
WEBシステムのようなサーバーが必要なシステムで、画面側の作成を行う際にモックサーバーがあると便利である。  
JSON-Serverを使用してモックを作成する。  
※JSON-Serverを使用するので、対象はRESTサーバーとなる。  

## 必須条件
* [node](https://nodejs.org/ja/)

## 使用方法

1. `mock/api/`配下にレスポンスとなるJSONを設定する。  
例) `account.json`を追加

```account.json
{
    "item": "a"
}
```

2. `mock/routes.json`に作成したレスポンスを取得するURLを設定。  
例) `/account`にアクセスした際に`account.json`の値をレスポンスとして設定する。  

```routes.json
{
    "/account": "/account"
}
```
※左側(key)がURLのパス、右側(value)が`/`を付けた`account.json`の`.json`を除いたファイル名  

3. 起動する

```
$ npm start
```

## POSTメソッドを使用したい場合の設定

上記の使用方法ではGETメソッドのみの対応である。  

1. POSTメソッドを使用したい場合は、`routes.json`に設定するURLに`_post`を付加するとよい。  
例) /account の POSTメソッドによるアクセスの場合の `routes.json`
```
{
    "/account_post": "/account"
}
```

2. 起動する

```
$ npm start
```
