const cache=new Map();

const getCache=(key)=>{
    return cache.get(key);
}
// ttl = time to live
const setCache=(key,value,ttl=60)=>{
    const now = new Date().getTime();
    const expireAt=now+(ttl*1000);
    const createAt=now;
    cache.set(key,{value,expireAt,createAt});
};

const isCacheValid=(key)=>{
    const cachedItem=getCache(key);
    if(cachedItem){
        const now = new Date().getItem();
        return cachedItem.expireAt>now;
    }else{
        return false;
    }
}

const getCacheInfo=(key)=>{
    const cachedItem=getCache(key);
    if(cachedItem){
        return {
            value:cachedItem.value,
            expireAt:cachedItem.expireAt,
            createAt:cachedItem.createAt        }
    }
    return null;
};
// metodo consultar api
const fectchFromApi= async(key,apicall)=>{
    try{
        const response= await apicall();
        setCache(key,response);
        return response;
    }catch(error){
        console.log(`error fecthing API ${error}`);
        return null;
    }
};


const getFromCacheOrAPi=async (key,apicall)=>{
    if(isCacheValid(key)){
        return getCache(key).value;
    }else{
        return fectchFromApi(key,apicall);
    }
};

module.exports={getCache,setCache,isCacheValid,getCacheInfo,fectchFromApi,getFromCacheOrAPi};


