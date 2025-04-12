import { Music, Ticket, Calendar, MapPin, Users, Plane } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory
    const navigateToDashboard = () => {
        navigate('/dashboard-preview'); // Redirige a la página /dashboard-preview
    };

    return (
        <>
            <div className="wrapper">
                <header>
                    <h1>Gig Organizer</h1>
                    <p id="welcome-text">Track your concerts, festival, and live music experiences in one place</p>
                    <div className="button-container">
                        <button id="register">Register</button>
                        <button id="login">Login</button>
                        <button onClick={navigateToDashboard} id="preview-app">Preview App<a></a></button>
                    </div>
                </header>
                <section id="presentation">
                    <h2>Everything you need to organize your live music experiences</h2>
                    <div id="box-container">
                        <article id="track">
                            <Music className="icon icon-music" />
                            <h3>Track Your Tickets</h3>
                            <p>Keep track of which shows you have tickets for and which ones you still need to purchase.</p>
                        </article>
                        <article id="organize">
                            <Ticket className="icon icon-ticket" />
                            <h3>Organize Your Schedule</h3>
                            <p>Never miss a show with a clear view of your upcoming gigs sorted by date.</p>
                        </article>
                        <article id="venue">
                            <Calendar className="icon icon-calendar" />
                            <h3>Venue & Location Details</h3>
                            <p>Store venue information and city details for easy reference when planning your trip.</p>
                        </article>
                        <article id="travel">
                            <MapPin className="icon icon-map-pin" />
                            <h3>Travel Budget Planning</h3>
                            <p>Calculate and track all your travel expenses including transport, accommodation, and more</p>
                        </article>
                        <article id="festival">
                            <Users className="icon icon-users" />
                            <h3>Festival Artist Tracking</h3>
                            <p>Mark which artists you want to see at festivals and organize your festival experience.</p>
                        </article>
                        <article id="journey">
                            <Plane className="icon icon-plane" />
                            <h3>Complete Music Journey</h3>
                            <p>Keep a record of all your live music experiences in one beautiful, organized place.</p>
                        </article>
                    </div>
                </section>
                <section id="jump-to-app">
                    <h2>Ready to organize your gig life</h2>
                    <p>Join thousands of music fans who use Gig Organizer to plan their concert experiences.</p>
                    <div className="button-container">
                        <button id="get-started">Get Started For Free</button>
                        <button id="demo">Try Demo</button>
                    </div>
                </section>
            </div>
        </>
    )
};

export default Home;
