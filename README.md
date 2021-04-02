<!-- ![](./res/) -->

# GarMail

## デモ

![demo](./demo.gif)

## インストール

1. 下のXMLファイルを保存
[HTMLポートレット](./html_portlet.xml)
2. Garoon個人設定からHTMLポートレットの読み込み
3. ポータルに追加

## 使いかた

1. 編集アイコンでテンプレートを編集
1. テンプレートをクリックで送信

### テンプレート置換機能

以下の文字は送信確認画面で置き換えられます。

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

## License

MIT License
