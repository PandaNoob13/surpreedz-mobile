
const EditProfileService = ({doPut}) => {
    const putProfile = async (data) => {
        console.log("Try Edit Profile Put");
        try {
            return await doPut({url: '/account/edit-profile', data: data})
        } catch (error) {
            console.log('Error', error);
            throw error
        }
    }
    const putPassword = async (data) => {
        console.log("Try Edit Password Put");
        try {
            return await doPut({url: '/account/edit-password', data: data})
        } catch (error) {
            console.log('Try Edit Profile Put : Error', error);
            throw error
        }
    }

    return {putProfile, putPassword}
  
}

export default EditProfileService