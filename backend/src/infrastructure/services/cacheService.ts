import { env } from "process";
import { ICacheService } from "../../application/interfaces/service/cacheServiceInterface";
import { Messages } from "../../presentation/shared/constants/errorMessage/messages";
import { createClient,RedisClientType} from "redis";
import { Error } from "../../presentation/shared/constants/errorMessage/Error";

export class CacheService implements ICacheService {
    private _redisClient:RedisClientType;
    
    constructor(){
        this._redisClient = createClient({url:env.REDIS_URL});

        this._redisClient.on("error",(err)=>{
            console.log(Error.REDIS_CONNECTED_ERROR)
        })

        this._redisClient.on("connect",()=>{
            console.log(Messages.REDIS_CONNECTED)
        });

        this._redisClient.on("disconnect",()=>{
            console.log(Messages.REDIS_DISCONNECTED)
        })
    };


    async connect(){
        if(!this._redisClient.isOpen){
            await this._redisClient.connect();
        }
    }

    async setData(key: string, value: string, expireTime?: number): Promise<void> {
        if(!this._redisClient.isOpen){
            await this._redisClient.connect();
        }
        if(expireTime){
            this._redisClient.setEx(key,expireTime,value);
        }else{
            this._redisClient.set(key,value)
        }
    };

    async getData(key: string): Promise<string | null> {
        if(!this._redisClient.isOpen){
            this._redisClient.connect();
        };
        return await this._redisClient.get(key);
    }

    async deleteData(key: string): Promise<void> {
        if(!this._redisClient.isOpen){
            await this.connect();
        };
        await this._redisClient.del(key);
    }
}