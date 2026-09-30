import { User } from '../models/user.models.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body ?? {};


	try {
		const existingUser = await User.findOne({ email: normalizedEmail });
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

export { registerUser };
