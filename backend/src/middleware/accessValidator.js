import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError"
import { FlatMember } from "../models/flatMember.models.js"
import { ApiResponse } from "../utils/apiResponse"
const accessValidator = (roles = [])=>{
    return async (req,res,next)=>{
        try {
            let {user} = req.body
            let flat_access =  await FlatMember.findOne({userId : user.sub})
            if(!flat_access){
                return res.status(401).json(
                    new ApiError(401,"user is not part of the flat")
                )
            }
            let flat_role  = flat_access.role;
            if(! flat_role in roles){
                return res.status(400).json(
                    new ApiError(400,"user does not have the required permissions ")
                )
            }
            return res.status(200).json(
                new ApiResponse(200,"user access granted ")
            )
          
            
        } catch (error) {
            return res.status(400).json(
                new ApiError(400,"something went wrong while verifying user access")
            )
            
        }
      
    }
}