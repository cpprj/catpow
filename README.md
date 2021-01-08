<p align="center">
  <img src="https://raw.githubusercontent.com/synchrovision/catpow/master/theme_default/images/logo.png">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-7.2-45A?logo=php">
  <img src="https://img.shields.io/badge/WordPress-5.5-blue?logo=wordpress">
</p>

CatpowはWordPressでオリジナルCMSを作成するためのフレームワークのプラグインです。

WordPressのフォルダに移動し下記コマンドでプラグインを追加します。

```command
git clone https://github.com/synchrovision/cawpow.git wp-content/plugins/catpow
```

WordPressのフォルダをgitのリポジトリとしている場合は以下のコマンドでcatpowをプラグインに追加してください。


```command
git submodule add https://github.com/synchrovision/cawpow.git wp-content/plugins/catpow
```

このプラグインのフォルダ名は「catpow」である必要があります。

このプラグインはアルファ版であり未完成を含む開発途中の機能を多く含んでおり仕様変更も頻繁に行います。ご使用はテストに留めてください。


主な機能
---

### カスタム投稿関連

 * 設定ファイルに基づいてテンプレートファイルを生成
 * 設定ファイルに基づいてパーマリンクを生成
 * カスタム投稿毎にカスタムフィールドを設定
 
### フォーム関連

 * テーマでフォームの機能をカスタマイズ
 * 受信する入力フィールドをホワイトリストで制御
 * 数字・カタカナ・正規表現パターンなど基本のバリデーションタイプ
 * テーマからバリデーションタイプを追加可能
 
### カスタムフィールド関連

 * テキスト・ラジオボタン・チェックボックス・セレクトボックスなど基本のフィールドタイプ
 * 関連投稿・関連ユーザーなどのリレーションのフィールドタイプ
 * 住所自動入力機能付きの郵便番号のフィールドタイプ
 * 住所からGoogleMapを表示するフィールドタイプ
 * 複数の入力値をグループ化したフィールドタイプ
 * 拡張データベースにデータを保存するフィールドタイプ
 * テーマからカスタムフィールドタイプを追加可能
 * ReactコンポーネントのUIによるフィールドタイプ
 
### ブロック関連

 * テーマからブロックを追加可能
 * テーマおよびプラグイン内のJSXファイルのコンパイラを内包
 
### ファイル関連

 * 設定ファイルに基づいてテーマのファイルを自動生成
 * テーマ内のSCSSファイルを自動コンパイル

使い方
---

1. プラグインの有効化　
1. 雛形のテーマを生成
1. テーマ内のconfig/system_config.phpを編集
1. テーマ内にテンプレートファイルを自動生成
1. 各テンプレートファイルを編集

というのがCatpowにおける最も基本的なテーマ作成の流れになります

system_config.phpで指定可能なカスタムフィールドタイプやテンプレートの種類
テンプレートファイルの編集で使用できる関数やクラス
同梱されるjqueryやscssのライブラリに関する情報は[公式サイト](https://catpow.info)にて提供する予定です
