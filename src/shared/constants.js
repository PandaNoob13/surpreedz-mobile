export const ROUTE = {
    SIGNIN: 'signIn',
    WELCOME: 'welcome',
    HOME: 'Home',
    MAIN: 'main',
    SIGNUP: 'signUp',
    ORDER:'order',
    SELLER:'Seller',
    BUYER:'Buyer',
    PAYMENT:'payment',
    PROFIL:'Profile',
    ABOUT:'About',
    MIDTRANS: 'midtrans',
}

export const SERVICE = {
    SIGNIN: '/api/auth/login',
    SIGNUP: '/account/signup',
    EDITPROFILE:'/account/edit-profile',
    EDITPASSWORD:'/account/edit-password',
    ADDSERVICE:'/service-detail/create-service-detail',
    
}

export const KEY = {
    TOKEN: 'token' ,
    ACCOUNTNAME:'account_name',
    USER_INFO:'user_info',
    ACCOUNT_ID:'account_id',
    ACCOUNT_EMAIL:'account_email',
    ACCOUNT_LOCATION :'account_location',
    ACCOUNT_JOINDATE :'account_join_date',
    SERVICE_ID:'service_detail_id',
    SERVICE_ROLE:'service_detail_role',
    SERVICE_DESCRIPTION:'service_detail_desc',
    SERVICE_PRICE:'service_detail_price',
    PHOTO_PROFILE:'photo_profile'

}

export const EMAIL_REGEX = '([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\\.[A-Z|a-z]{2,})+';

export const ORDER_ACTION_TYPE = {
    ADD_ORDER : 'ADD_ORDER',
    CLEAR_ORDER: 'CLEAR_ORDER',
    GET_ORDER_DETAIL:'GET_ORDER_DETAIL'
}