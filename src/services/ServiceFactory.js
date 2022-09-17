import SignInService from "./SignInService"
import SignUpService from "./SignUpService"


const ServiceFactory = (apiClient) => {
    return {
        signInService : SignInService(apiClient),
        signUpService : SignUpService(apiClient)
    }
}

export default ServiceFactory