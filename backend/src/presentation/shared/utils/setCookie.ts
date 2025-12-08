import { CookieOptions,Response } from "express";

 export function setCookie (
    res:Response,
    key:string,
    value:string,
    options:CookieOptions
 ){
    res.cookie(key,value,options)
 }