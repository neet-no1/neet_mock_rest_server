
const log_file_name = 'mock-server.log';  // ログファイル名
const log_level = 'debug';  // ログレベル fatal, error, warn, info, debug, trace のいずれかを指定する

const file_upload_dir = 'public/uploads';  // ファイルアップロード先ディレクトリ

const db_json = 'mock.json';  // json-serverのレスポンスとなるJSON情報
const routes_json = 'routes.json';  // json-serverのパス変化用JSON情報

const path = require('path')

/* ログの設定 */ 
const log4js = require('log4js')
log4js.configure({
    appenders : {
    system : {type : 'file', filename : path.join(__dirname, log_file_name)}
    },
    categories : {
    default : {appenders : ['system'], level : 'debug'},
    }
});
const logger = log4js.getLogger('json-server');
logger.level = log_level;

/* ファイルアップロード関連の設定 */
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, file_upload_dir));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
})
var upload = multer({ storage })

/* json-serverの設定 */
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, db_json))
const middlewares = jsonServer.defaults()
const routes = require(path.join(__dirname, routes_json))

server.use(middlewares)
server.use(upload.any());
server.use(jsonServer.bodyParser)

// リクエストパラメタ情報をログに出力
server.use((req, res, next) => {

    logger.info('===== request =====')
    logger.info('URL: ' + req.url)
    logger.info(req.method)
    logger.info('header: ')
    logger.info(req.headers)

    if (req.method === 'POST') {
        req.url += '_post'
        req.method = 'GET'
        logger.info('body: ')
        logger.info(req.body)
        logger.info(req.files)
    }

    if (req.method === 'GET') {
        logger.info('query: ')
        logger.info(req.query)
    }

    next()
})

server.use(jsonServer.rewriter(routes))
server.use(router)
server.listen(48080, () => {
  console.log('JSON Server is running')
  logger.info('JSON Server is running')
})