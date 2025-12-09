import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
      const { token } = req.headers;
console.log("TOKEN FROM FRONTEND:", token);


        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Access Denied" });
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = token_decoded.id
next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
