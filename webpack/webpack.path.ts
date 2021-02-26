import * as path from 'path'

const root = path.dirname(__dirname)

const dir = {
  src: path.join(root, 'src'),
  public: path.join(root, 'public'),
  build: path.join(root, 'build')
}

const prefix = path.posix.join('static', 'js')

export { prefix }
export default dir
