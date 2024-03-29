import { Logo } from '@assets'
import { App } from '@components/organisms'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { v4 as uuid4 } from 'uuid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      display: 'block',
      fill: theme.palette.text.secondary,
      height: theme.typography.h6.fontSize
    },
    appRoot: {
      overflowX: 'hidden',
      width: '100%'
    }
  })
)

const Home: React.FC = () => {
  const classes = useStyles()

  return (
    <ScopedCssBaseline>
      <div className={classes.appRoot}>
        <App
          title={<Logo className={classes.logo} />}
          url='https://not-dev.github.io/garmail/'
          dbPrefix='GarMail'
          examples={{
            [uuid4()]: {
              index: 0,
              title: '日報',
              config: {
                to: ['manager@example.com', 'chief@example.com'],
                cc: ['staff-a@example.com', 'staff-b@example.com'],
                subject: '【日報】 %LASTNAME% (%TODAY%)',
                body: '本日の作業内容です。\n\n%CLIPBOARD%\n\n以上'
              }
            },
            [uuid4()]: {
              index: 1,
              title: '部内ML',
              config: {
                to: ['"マネージャー" <manager@example.com>', '"チーフ" <chief@example.com>', '"スタッフA" <staff-a@example.com>', '"スタッフB" <staff-b@example.com>']
              }
            },
            [uuid4()]: {
              index: 2,
              title: '見積依頼',
              config: {
                subject: '見積書ご送付の依頼',
                body: `株式会社XXXX
              XXXX様

              平素より大変お世話になっております。
              株式会社EXAMPLE 情報システム部の%NAME%です。

              先日貴社へお伺いした際にご提案いただきました
              貴社製品の「XXXX」について、社内で購入を検討しております。

              つきましては下記条件にてお見積書を作成いただき、
              ご送付くださいますようお願い申し上げます。

              ----------
              商品名：XXXX
              数量：XXXX
              納期：XXXX
              ----------

              不明点等ございましたらお申し付けください。

              お手数をおかけしますが、
              何卒宜しくお願い申し上げます。

              %SIGNATURE%
              `.replace(/^[^\S\n]{12}/gm, '')
              }
            }
          }}
          text={{
            tooltip: {
              help: 'ヘルプ'
            },
            main: {
              newEntry: {
                title: '新しいテンプレート'
              },
              hinagata: {
                config: {
                  label: {
                    to: 'to',
                    cc: 'cc',
                    subject: 'subject',
                    body: 'body'
                  },
                  deleteConfirm: {
                    title: '',
                    message: '削除しますか？'
                  },
                  button: {
                    delete: 'DELETE'
                  }
                }
              },
              mailer: {
                title: '送信確認',
                label: {
                  to: 'to',
                  cc: 'cc',
                  subject: 'subject',
                  body: 'body'
                },
                helper: {
                  invalidEmail: '不正な入力です',
                  required: '必須項目'
                },
                button: {
                  send: '送信',
                  cancel: 'キャンセル'
                },
                snack: {
                  pending: '送信中',
                  done: '完了',
                  error: 'エラー',
                  timeout: 'タイムアウト'
                }
              }
            }
          }}
        />
      </div>
    </ScopedCssBaseline>
  )
}

export { Home }
