import { Request, Response, NextFunction } from "express";

export class SubdomainMiddleware {

  verifySubdomain = async (req: Request, res: Response, next: NextFunction) => {
    const subdomain = req.headers["x-tenant"] as string | undefined;
    if(subdomain){
      req.tenant= subdomain;
      return next();
    }else{
      return res.status(400).json({success:false,message:"Your gym is not exixt.! Please enter valid URL.!"});
    }
  }
}
