import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import twilio from 'twilio'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const otps = {}
const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken }
}

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	})
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	})
}

export const sendOTP = async (req, res) => {
	const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
	const otp = crypto.randomInt(100000, 999999).toString()
	const { phone } = req.body

	try {
		await client.messages.create({
			body: `Your Verification code for REREAD MARKETPLACE: ${otp}`,
			from: '+12313104187',
			to: phone

		})
		const hashedOtp = await bcrypt.hash(otp, 10)
		otps[phone] = { otp: hashedOtp, timestamp: Date.now() }
		res.status(200).send('OTP sent successfully.')
	} catch (error) {
	
		console.error('Error sending OTP SMS:', error);
	}


}

export const verifyOTP = async (req, res) => {
	const { phone, otp } = req.body
	const storedOtp = otps[phone]
	console.log(otps)
	if (!storedOtp) {
		return res.status(400).send('OTP not sent or expired.');
	}
	if (Date.now() - storedOtp.timestamp > 5 * 60 * 1000) {
		delete otps[phone]; // OTP expired, delete it
		return res.status(400).send('OTP expired.');
	}

	const isMatch = await bcrypt.compare(otp, storedOtp.otp);

	if (isMatch) {
		res.status(200).send('OTP verified successfully.');
	} else {
		res.status(400).send('Invalid OTP.');
	}
}

export const signup = async (req, res) => {

	const { name, phone, password } = req.body
	try {
		const userExist = await User.findOne({ phone })

		if (userExist) {
			return res.status(400).json({ message: "User already exists" })
		}

		const user = await User.create({ name, phone, password })

		const { accessToken, refreshToken } = generateTokens(user._id)


		setCookies(res, accessToken, refreshToken)

		res.status(201).json({
			message: "User created successfully",
			_id: user._id,
			name: user.name,
			phone: user.phone,
			role: user.role
		})

	} catch (error) {
		console.log("Error in signup controller", error.message)
		res.status(500).json({ message: error.message })
	}
}

export const login = async (req, res) => {
	const { phone, password } = req.body
	try {
		const user = await User.findOne({ phone })
		if (user && (await user.comparePassword(password))) {

			const { accessToken, refreshToken } = generateTokens(user._id)

			setCookies(res, accessToken, refreshToken)

			res.status(201).json({
				_id: user._id,
				name: user.name,
				phone: user.phone,
				role: user.role
			})
		} else {
			return res.status(400).json({ message: "Invalid phone or password" })
		}

	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
}

export const loginWithGoogle = async (req, res) => {

	const { token } = req.body
	const name = jwt.decode(token).name
	const email = jwt.decode(token).email


	try {
		const user = await User.findOne({ email })
		if (user) {
			const { accessToken, refreshToken } = generateTokens(user._id)

			setCookies(res, accessToken, refreshToken)

			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role
			})
		} else {
			const user = await User.create({ name, email })

			const { accessToken, refreshToken } = generateTokens(user._id)

			setCookies(res, accessToken, refreshToken)

			res.status(201).json({
				message: "User created successfully",
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role
			})

		}
	} catch (error) {
		console.log("Error in loginWithGoogle controller", error.message);
		res.status(500).json({ message: error.message });
	}
}

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" })
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

export const getProfile = async (req, res) => {
	try {
		res.json(req.user)
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

export const getUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await User.findById(id)
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		
		res.status(200).json(user)

	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({ role: { $ne: "admin" } })
		res.json(users)
	} catch (error) {
		console.log("Error in getAllReports controllers", error.message)
		res.status(500).json({ message: "server error" })
	}
}

export const banUser = async (req, res) => {
	try {
		console.log(req.params.id)
		const user = await User.findByIdAndUpdate(req.params.id, { banned: true }, { new: true });
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json({ message: "User banned successfully", user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}