import videoFile from "./assets/Horror_Environment_Video_Generation.mp4";
function Home(){
    return(
        <div className="hometab">
            <video src={videoFile} autoPlay loop muted />
            <p className="homepara">
                Ever wondered if the whispers in the dark are more than just your imagination? Debunkify delves into the hidden corners of the digital abyss — where the line between truth and delusion blurs, and every rumor feels a little too calculated. Here, the theories twist like tangled wires, and facts dissolve under the flicker of uncertainty. Type in your most disturbing conspiracies, and watch as our AI dissects them piece by piece, exposing lies that masquerade as logic — and truths too fragile to survive the light. Be warned, though… once you start asking the right questions, you might not like the answers you find. Dare to uncover the truth… if you can still trust your mind when it’s over.
            </p>
        </div>
    )
}

export default Home;