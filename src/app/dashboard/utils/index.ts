"use server";

import {store} from "../../../redux";

const {user} = store.getState().user;

// let decoded: JwtPayload = JWT.jwtDecode(response.data.access_token);
export const getUserRole = async() => {
    // let decoded: JwtPayload = JWT.jwtDecode(response.data.access_token);
   await console.log(user);

}