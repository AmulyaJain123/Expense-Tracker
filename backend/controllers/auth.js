const { findUserByEmail, addUser, changePass } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authTransport, generateOtp, generateUserId } = require('../util/nodemailer')
const { storeOtp, verifyOtp } = require('../models/auth')

const getOtp = async (req, res) => {
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const doc = await findUserByEmail(email);
    if (doc) {
        res.status(409).json("email exists");
    } else {
        const otp = generateOtp();
        const reciever = {
            from: "billbudofficial@gmail.com",
            to: email,
            subject: "OTP for Signup on BillBud",
            text: `Welcome to BillBud!!
Your One-Time Password (OTP) for completing the verification process is:
${otp}`
        }
        authTransport.sendMail(reciever, async (err, emailRes) => {
            if (err) {
                console.log(err);
                res.status(409).json("email invalid");
            }
            else {
                console.log(emailRes);
                const storeRes = await storeOtp(email, otp);
                if (storeRes === '500') {
                    res.status(409).json("failed");
                }
                res.status(200).json({ otp: otp, email: email });
            }
        })
    }
}

const resendOtp = async (req, res) => {
    // Currently same logic as getOtp 
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const doc = await findUserByEmail(email);
    if (doc) {
        res.status(409).json("email exists");
    } else {
        const otp = generateOtp();
        const reciever = {
            from: "billbudofficial@gmail.com",
            to: email,
            subject: "OTP for Signup on BillBud",
            text: `Welcome to BillBud!!
Your One-Time Password (OTP) for completing the verification process is:
${otp}`
        }
        authTransport.sendMail(reciever, async (err, emailRes) => {
            if (err) {
                console.log(err);
                res.status(409).json("email invalid");
            }
            else {
                console.log(emailRes);
                const storeRes = await storeOtp(email, otp);
                if (storeRes === '500') {
                    res.status(409).json("failed");
                }
                res.status(200).json({ otp: otp, email: email });
            }
        })
    }
}

const resetResendOtp = async (req, res) => {
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const doc = await findUserByEmail(email);
    if (doc) {
        const otp = generateOtp();
        const reciever = {
            from: "billbudofficial@gmail.com",
            to: email,
            subject: "OTP for Password Reset on BillBud",
            text: `Welcome to BillBud!!
Your One-Time Password (OTP) to reset your account password is:
${otp}`
        }
        authTransport.sendMail(reciever, async (err, emailRes) => {
            if (err) {
                console.log(err);
                res.status(409).json("email invalid");
            }
            else {
                console.log(emailRes);
                const storeRes = await storeOtp(email, otp);
                if (storeRes === '500') {
                    res.status(409).json("failed");
                }
                res.status(200).json({ otp: otp, email: email });
            }
        })
    } else {
        res.status(409).json("notfound");

    }
}

const checkOtp = async (req, res) => {
    const { email, otp } = req.body;
    const result = await verifyOtp(email, otp);
    if (result === '500') {
        res.status(500).json("failed");
    } else if (result) {
        res.status(200).json("correct");
    } else {
        res.status(200).json("incorrect");
    }
}

const resetCheckOtp = async (req, res) => {
    const { email, otp } = req.body;
    const result = await verifyOtp(email, otp);
    if (result === '500') {
        res.status(500).json("failed");
    } else if (result) {
        res.status(200).json("correct");
    } else {
        res.status(200).json("incorrect");
    }
}

const createAccount = async (req, res) => {
    const { email, username, password } = req.body;
    const userId = generateUserId();
    const newPassword = await bcrypt.hash(password, 12);
    console.log(userId, email, password);
    const result = await addUser(email, newPassword, username, userId);
    if (!result) {
        res.status(500).json("failed");
    } else if (result) {
        res.status(200).json("success");
    }
}

const changePassword = async (req, res) => {
    const { email, password } = req.body;
    const newPassword = await bcrypt.hash(password, 12);
    console.log(email, password);
    const result = await changePass(email, newPassword);
    if (!result) {
        res.status(500).json("failed");
    } else if (result === "notfound") {
        res.status(500).json("notfound");
    } else {
        res.status(200).json("success");

    }
}

const signIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase().trim();
        const doc = await findUserByEmail(email);

        if (doc) {
            const result = await bcrypt.compare(password, doc.password);
            if (result) {
                const userData = { email: doc.email, userId: doc.userId, username: doc.username };
                const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "30d" });
                const expiryDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30);
                console.log(token, expiryDate);
                res.cookie('token', token, { expires: expiryDate });
                res.status(200).json("success");
            } else {
                res.status(500).json("password wrong")
            }
        } else {
            res.status(500).json("notfound");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('failed');
    }
}

const resetGetOtp = async (req, res) => {
    let { email } = req.body;
    email = email.trim().toLowerCase();
    const doc = await findUserByEmail(email);
    if (doc) {
        const otp = generateOtp();
        const reciever = {
            from: "billbudofficial@gmail.com",
            to: email,
            subject: "OTP for Password Reset on BillBud",
            text: `Welcome to BillBud!!
Your One-Time Password (OTP) to reset your account password is:
${otp}`
        }
        authTransport.sendMail(reciever, async (err, emailRes) => {
            if (err) {
                console.log(err);
                res.status(409).json("email invalid");
            }
            else {
                console.log(emailRes);
                const storeRes = await storeOtp(email, otp);
                if (storeRes === '500') {
                    res.status(409).json("failed");
                }
                res.status(200).json({ otp: otp, email: email });
            }
        })
    } else {
        res.status(409).json("notfound");

    }
}

const getDetails = async (req, res) => {
    try {
        const token = req.cookies?.token;
        console.log(token);
        if (token) {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const doc = await findUserByEmail(payload.email);
            if (!doc) {
                throw "notfound";
            }
            res.status(200).json({ email: doc.email, username: doc.username });
        } else {
            throw "notfound";
        }
    } catch (err) {
        console.log(err);
        res.status(200).json("notfound");
    }
}


// const signOut = async (req, res) => {
//     try {
//         let token;
//         token = req.headers.authorization?.split(' ')[1];
//         console.log("pu", token)
//         if (token) {

//             
//             const result = await logOut(payload.email, token);
//             res.status(200);
//             res.send();
//         } else {
//             res.status(401);
//             res.send();
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(401);
//         res.send()
//     }
// }

exports.getOtp = getOtp;
exports.checkOtp = checkOtp;
exports.resendOtp = resendOtp;
exports.createAccount = createAccount;
exports.signIn = signIn;
exports.resetGetOtp = resetGetOtp;
exports.resetResendOtp = resetResendOtp;
exports.resetCheckOtp = resetCheckOtp;
exports.changePassword = changePassword;
exports.getDetails = getDetails;