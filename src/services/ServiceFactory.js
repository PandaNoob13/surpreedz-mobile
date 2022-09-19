import addEditServiceService from "./AddEditServiceService"
import EditProfileService from "./EditProfileService"
import SignInService from "./SignInService"
import SignUpService from "./SignUpService"


const ServiceFactory = (apiClient) => {
    return {
        signInService : SignInService(apiClient),
        signUpService : SignUpService(apiClient),
        editProfileService : EditProfileService(apiClient),
        addEditServiceService : addEditServiceService(apiClient),
    }
}

export default ServiceFactory