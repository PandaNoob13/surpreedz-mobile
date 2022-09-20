import { SERVICE } from "../shared/constants";

const EditProfileService = ({doPut}) => {
    const putProfile = async (data) => {
        console.log("Try Edit Profile Put");
        try {
            console.log('Data before sent : ', data);
            return await doPut({url: SERVICE.EDITPROFILE, data: data})
        } catch (error) {
            console.log('Error', error);
            throw error
        }
    }
    const putPassword = async (data) => {
        console.log("Try Edit Password Put");
        try {
            return await doPut({url: SERVICE.EDITPASSWORD, data: data})
        } catch (error) {
            console.log('Try Edit Profile Put : Error', error);
            throw error
        }
    }

    return {putProfile, putPassword}
  
}

export default EditProfileService