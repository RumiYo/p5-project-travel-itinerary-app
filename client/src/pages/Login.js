import { useState } from "react";
import LoginForm from "../components/Home/LoginForm";
import SignUpForm from "../components/Home/SignUpForm";
import homePhoto from "../components/Home/home_photo.jpg"

function Login(){  
    const [ showLogin, setShowLogin ] =useState(true);

        return (
            <div id="login">
                <h1>Travel Itinerary App</h1>
                {showLogin ? (
                    <>
                    <LoginForm />
                    <p>Don't have an account?</p>
                    <button  className="buttons" onClick={() => setShowLogin(false)} >
                          Go to Signup page
                    </button>
                    </>
                ) : (
                    <>
                        <SignUpForm />
                        <p>Already have an account? </p>
                        <button  className="buttons" onClick={() => setShowLogin(true)}>
                            Go to Login page
                        </button>
                    </>
                )}
                <br/>
                <div className="home">
                    <img src={homePhoto} alt="Home" id="topImage" style={{ width: '50%', height: 'auto' }} />
                    <p>Welcome to WanderLog! <br/><br/>Your next adventure starts here. <br/>At WanderLog, we believe that travel should be seamless and memorable. Our app is designed to help you plan every detail of your journey with ease. Whether you're exploring new cities, relaxing on a tropical beach, or embarking on a cross-country road trip, WanderLog has you covered.</p>
                        <p>Personalized Itineraries: Tailor your travel plans to fit your unique preferences and needs.<br/>Destination Insights: Discover must-see attractions, local hotspots, and hidden gems.</p>

                    <p>Sign up today and let WanderLog turn your travel dreams into reality. Your adventure awaits!</p>
                </div>
            </div>
        )
}

export default Login;