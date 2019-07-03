import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 执行axios(xxx) 就相当于执行了 Axios 原型上的 request 方法，也就是 axios.request(xxxx)
  // Q:为什么要使用bind语法bind一下context呢？
  // A:为了直接执行 instance 函数的时候，也就是调用 request 方法的时候， this 指向的是 axios 的实例
  // 因为axios可以直接调用也可以使用api调用
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
