import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';
import {Flat} from "../models/flat.models.js"
import { FlatLog} from '../models/flatLog.models.js';
import asyncHandler from '../utils/asyncHandler.js';
import { userRolesEnum } from '../utils/roles.utils.js';
import { FlatMember } from '../models/flatMember.models.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';


const createFlat =  asyncHandler(async (req,res)=>{
    const {user} = req
    const {name,address,city} = req.body
    try {
        let flat = await Flat.create({
            name,address,city,
            createdBy : user._id
        })

        await FlatMember.create({
            flatId : flat._id,
            userId : user._id,
            role : userRolesEnum.ADMIN
        })

        res.status(201).json(
            new ApiResponse(201,{message : "space created successfully",flatId : flat_id})
        )
        
    } catch (error) {
        res.status(400).json(
            new ApiError(404,"something went wrong while creating space")
        )
        
    }
})


const addMemeberToFlat = asyncHandler(async (req,res)=>{
    let {user} = req
    let {email,setRole} = req.body
    let flatId =  req.cookies?.flatId || req.header("flatId").replace("Bearer ","")

    try {
        let addUser = await User.findOne({email});
        if(!user){
            return res.status(404).json(
                new ApiError(404,"user with the email does not exist")
            )
        }

        await FlatMember.create({
            flatId,
            userId : addUser._id,
            role : setRole ||  userRolesEnum.MEMBER
        })


        return res.status(200).json(
            new ApiResponse(200,"memeber added to space successfully")
        )

        
        
    } catch (error) {
         res.status(400).json(
            new ApiError(404,"something went wrong while adding memeber to space")
        )  
    }
    
    
})