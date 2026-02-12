import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateToken = async (user) => {
   const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
   return token;
}

export const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, Number(process.env.SALT));
}

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}
