var isPro = Object.is(process.env.NODE_ENV, 'production')

export default {
  baseUrl: isPro ? 'http://172.19.1.82:8003/' : 'api/'
  // baseUrl: isPro ? 'http://132.10.10.41:8003/' : 'api/' // 服务器ip
}
