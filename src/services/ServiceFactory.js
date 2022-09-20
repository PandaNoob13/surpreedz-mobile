import addEditServiceService from "./AddEditServiceService";
import EditProfileService from "./EditProfileService";
import homeService from "./HomeService";
import purchaseListService from "./PurchaseListService";
import requestListService from "./RequestListService";
import SignInService from "./SignInService";
import SignUpService from "./SignUpService";
import OrderService from "./OrderService"


const ServiceFactory = (apiClient) => {
    return {
        signInService : SignInService(apiClient),
        signUpService : SignUpService(apiClient),
        editProfileService : EditProfileService(apiClient),
        addEditServiceService : addEditServiceService(apiClient),
        homeService : homeService(apiClient),
        requestListService : requestListService(apiClient),
        purchaseListService : purchaseListService(apiClient),
        orderService : OrderService(apiClient),
    }
}

export default ServiceFactory