import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function Login({ onLogin }){
    const [ showLogin, setShowLogin ] =useState(true);

        return (
            <div id="login">
                <h1>Travel Itinerary App</h1>
                {showLogin ? (
                    <>
                    <LoginForm onLogin={ onLogin } />
                    <p>Don't have an account?</p>
                    <button  className="buttons" onClick={() => setShowLogin(false)} >
                          Go to Signup page
                    </button>
                    </>
                ) : (
                    <>
                        <SignUpForm onSignUp={ onLogin } />
                        <p>Already have an account? </p>
                        <button  className="buttons" onClick={() => setShowLogin(true)}>
                            Go to Login page
                        </button>
                    </>
                )}
                <br/>
                <div className="home">
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-realistic-3d-rendering-of-laptop-accessing-online-library-image_3797278.jpg" alt="library" id="topImage"/>
                    <p>Welcome to Travel Itinerary App! <br/><br/>Dive into a world of boundless knowledge and endless stories with our extensive collection of digital books. Whether you’re a student, a casual reader, or a literary enthusiast, Rumi Online Library is your gateway to an enriching reading experience. Explore thousands of titles across various genres and subjects, all at your fingertips.<br/><br/> Join our community of book lovers and embark on your next literary adventure today!</p>
                </div>
            </div>
        )
}

export default Login;