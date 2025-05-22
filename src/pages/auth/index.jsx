import {auth, provider} from "../../config/firebase-config"
import {signInWithPopup} from "firebase/auth";
import {useNavigate, Navigate} from "react-router-dom";
import {useGetUserInfo} from "../../hooks/useGetUserInfo"
import "./styles.css"
import { useEffect } from "react";

export const Auth = () => {
    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker");
    };

    const signInWithTestAccount = () => {
        const authInfo = {
            userID: "testID",
            name: "Demo Account",
            profilePhoto: "/user.png",
            isAuth: true
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker");
    }

    if(isAuth) {
        return <Navigate to="expense-tracker" />;
    }

    return (
        <div className="login-page">
            <p className="mg-btm-lg-rem">Sign In to Continue</p>
            <button className="login-with-google-btn btn-effect mg-btm-sm-rem" onClick={signInWithGoogle}>
                {""}
                Sign In With Google
            </button>
            <button className="login-with-test-account-btn btn-effect" onClick={signInWithTestAccount}>Sign In With DemoAccount</button>
        </div>
    );
}