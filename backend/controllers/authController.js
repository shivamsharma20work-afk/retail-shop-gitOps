const User = require('../models/userModel');

/**
 * @desc    Generate and "Send" OTP (Save to DB)
 * @route   POST /api/send-otp
 */
const sendOTP = async (req, res) => {
    try {
        const { contact } = req.body;

        if (!contact) {
            return res.status(400).json({ message: "Bhai, email ya phone toh daalo!" });
        }

        // 6 digit random OTP generate karna
        const otp = Math.floor(100000 + Math.random() * 900000);
        
        // Database mein User dhoondo ya naya banao aur OTP update karo
        // upsert: true ka matlab hai agar user nahi mila toh naya bana do
        await User.findOneAndUpdate(
            { contact }, 
            { otp, isVerified: false }, 
            { upsert: true, new: true }
        );

        console.log(`------------------------------`);
        console.log(`Bhai-Zon DB OTP for ${contact}: ${otp}`);
        console.log(`------------------------------`);

        res.status(200).json({ 
            success: true, 
            message: "OTP bhej diya hai aur DB mein save ho gaya hai!" 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server mein kuch gadbad hai bhai." });
    }
};

/**
 * @desc    Verify OTP from DB
 * @route   POST /api/verify-otp
 */
const verifyOTP = async (req, res) => {
    try {
        const { contact, otp } = req.body;

        if (!contact || !otp) {
            return res.status(400).json({ message: "Details adhuri hain bhai!" });
        }

        // DB mein user ko uske contact aur OTP se dhoondo
        const user = await User.findOne({ contact, otp });

        if (user) {
            // OTP match ho gaya! Ab user ko verify mark karo aur OTP clean kar do
            user.otp = null;
            user.isVerified = true;
            await user.save();
            
            res.status(200).json({ 
                success: true, 
                message: "DB Verification Successful! Welcome to Bhai-Zon." 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: "Galat OTP hai ya expire ho gaya hai." 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification fail ho gayi." });
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};