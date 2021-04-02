## 使いかた

### 操作

* 編集アイコンでテンプレートを編集
* テンプレートをクリックで送信画面
* 送信画面でテンプレート保存せずに編集
* 右クリックで削除
* =のアイコンをドラッグで並び替え
* ドラッグ中に画面下のゴミ箱エリアに移動で削除

### 項目

to: 宛先
cc: CC
subject: 表題
body: 本文

### テンプレート置換機能

表題と本文では、以下の文字は送信確認画面で置き換えられます。

%CLIPBOARD% : クリップボードにコピーしている文字
%LASTNAME% : Garoonの苗字
%NAME% : Garoonのフルネーム
%SIGNATURE% : Garoonの1番目の署名
%TODAY% : 今日の日付(YYYYMMDD)

%SIGNATURE[N]% : GaroonのN番目の署名(e.g. %SIGNATURE[2]%)
%TODAY[FORMAT]% : 指定フォーマットの今日の日付(e.g. %TODAY[YYYY-MM-DD]%)

## データベース

データはブラウザのIndexedDBに保存されます
cookie削除等で初期化されます
