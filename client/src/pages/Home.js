import { useOutletContext } from "react-router-dom";
import homePhoto from "../components/Home/home_photo.jpg"

function Home(){
    const { user } = useOutletContext();

    return (
        <div className="home">
            <img src={homePhoto} alt="Home" id="topImage" style={{ width: '50%', height: 'auto' }} />
            <p>Hello {user.first_name} <br/><br/>Your next adventure starts here. <br/>At WanderLog, we believe that travel should be seamless and memorable. Our app is designed to help you plan every detail of your journey with ease. Whether you're exploring new cities, relaxing on a tropical beach, or embarking on a cross-country road trip, WanderLog has you covered.</p>
                <p>Personalized Itineraries: Tailor your travel plans to fit your unique preferences and needs.<br/>Destination Insights: Discover must-see attractions, local hotspots, and hidden gems.</p>

            <p>Sign up today and let WanderLog turn your travel dreams into reality. Your adventure awaits!</p>
        </div>
    )
}

export default Home;