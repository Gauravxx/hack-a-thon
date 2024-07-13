import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Projects from "../components/Projects"

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero name={"Dhruv"}/>
            <Projects />
            <Footer />
        </>
    )
}
export default Home