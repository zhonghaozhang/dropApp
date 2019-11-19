var isPro = Object.is(process.env.NODE_ENV, 'production')

export default {
  baseUrl: isPro ? 'http://172.19.1.82:8003/' : 'api/'
}
