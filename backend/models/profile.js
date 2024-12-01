const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    email: {
        type: 'String',
    },
    username: {
        type: 'String'
    },
    userId: {
        type: 'String'
    },
    joinedOn: {
        type: 'String'
    },
    upiId: {
        type: 'String',
        default: null
    },
    qrCode: {
        type: 'String',
        default: null
    },
    profilePic: {
        type: 'String',
        default: null
    }
})

async function addProfile(email, username, userId) {
    try {
        const currDate = new Date().toISOString();
        const doc = new Profile({ email, username, userId, joinedOn: currDate });
        await doc.save();
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getProfile(email) {
    try {
        const doc = Profile.findOne({ email: email });
        if (!doc) {
            throw "notfound";
        }
        return doc;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function editUsername(email, username) {
    try {
        const res2 = await Profile.updateOne({ email: email }, { $set: { username: username } });
        if (!res2) {
            throw "failed";
        }
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function editUpi(email, upiId) {
    try {
        let newUpi = upiId.trim() === "" ? null : upiId;
        const res2 = await Profile.updateOne({ email: email }, { $set: { upiId: newUpi } });
        if (!res2) {
            throw "failed";
        }
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function editProfilePic(email, url) {
    try {
        const res2 = await Profile.updateOne({ email: email }, { $set: { profilePic: url } });
        if (!res2) {
            throw "failed";
        }
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}



const Profile = mongoose.model('Profile', profileSchema);


exports.profileModel = Profile;
exports.addProfile = addProfile;
exports.getProfile = getProfile;
exports.editUsername = editUsername;
exports.editUpi = editUpi;
exports.editProfilePic = editProfilePic;







