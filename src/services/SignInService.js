
import { SERVICE } from "../shared/constants";

const SignInService = ({doPost}) => {
    const postLogin = async (userCred={}) => {
        console.log("Try Login Service Post 1");
        console.log('userCred 1', userCred);
        try {
            console.log('userCred', userCred);
            return await doPost({url: SERVICE.SIGNIN, data: userCred})
            console.log('doPOst');
        } catch (error) {
            // throw error
            console.log('error services => ', error);
        }
    }
    return {postLogin}
  
}

export default SignInService
