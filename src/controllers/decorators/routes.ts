import { RequestHandler } from 'express'
import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { Methods } from './Methods'

interface RouteHandlerDescriptor extends PropertyDescriptor{
    value?: RequestHandler
}

function routeBinder(method:string){
    return function get(path:string){
        return function(target:any, key:string, desc:RouteHandlerDescriptor){
            Reflect.defineMetadata(MetadataKeys.path, path, target, key)
            Reflect.defineMetadata(MetadataKeys.method, method, target, key)
        }
    }
}


const get = routeBinder(Methods.get)
const put = routeBinder(Methods.put)
const patch = routeBinder(Methods.patch)
const del = routeBinder(Methods.delete)
const post = routeBinder(Methods.post)

export {
    get,
    put,
    patch,
    del,
    post
}