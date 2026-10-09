import { User } from '../models/user.models.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { jwt } from 'twilio';







let generateToken = async (id)=>{
	let user = await User.findById(id);
	if(!user){
		return res.status(404).json(
			new ApiError(404,"unable to find user while generating access token")
		)
	}
	let accessSecret = process.env.ACCESS_TOKEN_SECRET
	let refreshSecret = process.env.REFRESH_TOKEN_SECRET
	let payload = {
		name : user.name,
		email : user.email,
		isVerified : user.isVerified,
	}
	let accessToken = jwt.sign(payload,accessSecret,{ExpiresIn : "10m"})
	let refreshToken = jwt.sign(payload,refreshSecret,{ExpiresIn : "7d"})
	return {accessToken,refreshToken}
}











const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body ?? {};


	try {
		const existingUser = await User.findOne({email});
		if (existingUser) {
			return res.status(409).json(
                new ApiError(409 , "An account with this email already exists.")
            );
		}

		const user = await User.create({
			name: name.trim(),
			email,
			password,
		});

        if(!user){
            return res.status(404).json({"message" : "unable to create user"})
        }

        

		return res.status(201).json(
			new ApiResponse(
				201,
				{ id: user._id, name: user.name, email: user.email },
				'Registration successful',
			),
		);


	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({
				success: false,
				message: 'An account with this email already exists.',
			});
		}
		return next(error);
	}
};


const loginUser = async (req,res)=>{
	try {
		let {email,password} = req.body;
	    let user =await User.findOne({email});
		if(!user){
			return res.status(404).json(
				new ApiError(404,"user with the email is not registered")
			)
		}
		let compare = user.comparePassword(password);
		if(!compare){
			return res.status(401).json( new ApiError(401,"password does not match"))
		}
		user.password = password;
		await user.save();

		try{
			let {accessToken,refreshToken} = await generateToken(user._id);
			user.accessToken = accessToken;
			user.acceesTokenExpiry = "10m"
			user.refreshToken = refreshToken
			user.refreshTokenExpiry = "7d"
			await user.save()

		}
		catch{
			return res.status(400).json(
				new ApiError(400,"something went wrong while generating tokens")
			)
		}
		
	} catch  {
		return res.status(400).json(
			new ApiError(400,"something went wrong while loggin in the user")
		)
	}


	
}
export { registerUser, loginUser};
