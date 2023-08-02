import UserModel from "../models/userModel.js";

// add user to db
export const addUser = async (req, res) => {
    try {
        //create model and write it to db
        const user = await UserModel.create(req.body);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// get all users from db
export const getUsers = async (req, res) => {
    try{
        //get all users from db
        const users = await UserModel.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// get one user by id from db
export const getUser = async (req, res) => {
    try{
        //get one user by id from db
        const user = await UserModel.findById(req.params.userID);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//update data about user in db
export const updateUser = async (req, res) => {
    try{
        //get user from db and update it in db
        const user = await UserModel.findByIdAndUpdate(req.params.userID, req.body);

        //check if user isn't in db
        if (!user){
            return res.status(404).json({message: "User not found."});
        }

        res.status(200).json(user);
    } catch (error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//delete user from db
export const delUser = async (req, res) => {
    try{
        //get user from db and delete from db
        const user = await UserModel.findByIdAndDelete(req.params.userID);

        //check if user isn't in db
        if (!user){
            return res.status(404).json({message: "User not found."});
        }
        res.status(200).json({message: "Deleted successfully."});
    } catch (error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//link logbook to user in db
export const addLogbookToUser = async (req, res) => {
    try{
        //get user from db
        const user = await UserModel.findById(req.params.userID);

        //check if user isn't in db
        if (!user){
            return res.status(404).json({message: "User not found."});
        }

        //link logbook to user from request
        user.logbooks.push(req.body);

        //save changes to db
        await user.save();

        res.status(200).json(user);
    } catch (error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//unlink logbook from user in db
export const delLogbookFromUser = async (req, res) => {
    try{
        //get user from db
        const user = await UserModel.findById(req.params.userID);

        //check if user isn't in db
        if (!user){
            return res.status(404).json({message: "User not found."});
        }

        //get logbookID from request
        const delLogbookID = req.params.delLogbookID;

        //find index of logbookID in array of logbooks
        const logbookIndex = user.logbooks.findIndex((logbook) => logbook.logbookID.toString() === delLogbookID);

        //check if logbookID in array
        if(logbookIndex === -1){
            return res.status(404).json({message: "Logbook not signed to user."});
        }

        //delete logbookID from array
        user.logbooks.splice(logbookIndex, 1);

        //save changes to db
        await user.save();

        res.status(200).json({message: "Deleted successfully."});
    } catch (error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};