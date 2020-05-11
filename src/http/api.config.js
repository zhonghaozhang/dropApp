var isPro = Object.is(process.env.NODE_ENV, 'production')

export default {
  // baseUrl: isPro ? 'http://172.19.1.82:8002/' : 'api/'
  // baseUrl: isPro ? 'http://132.10.10.41:8002/' : 'api/' // 服务器ip
  baseUrl: isPro ? 'http://223.71.26.229:8002/' : 'api/' // 外网服务器ip
}
