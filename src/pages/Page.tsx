import { Logo } from '@assets'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { App } from '@organisms'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      display: 'block',
      fill: theme.palette.text.secondary,
      height: theme.typography.h6.fontSize
    }
  })
)

const Page:React.FC = () => {
  const classes = useStyles()

  return (
    <App
      title={<Logo className={classes.logo}/>}
      url='https://github.com/not-dev/garmail#garmail'
      text={{
        tooltip: {
          help: 'ヘルプ'
        },
        main: {
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
  )
}

export { Page }
