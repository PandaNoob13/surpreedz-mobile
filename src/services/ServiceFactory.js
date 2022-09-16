import SignInService from "./SignInService"


const ServiceFactory = (apiClient) => {
    return {
        signInService : SignInService(apiClient)
    }
}

export default ServiceFactory