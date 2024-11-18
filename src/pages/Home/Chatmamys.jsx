import chatimg from "../../assets/chatt-removebg-preview.webp"
import "./Chat.css"
export default function Chat() {
    return (
        <div className="chat">
            <div className="cont">
                <div className="text">
                    <h2>Mamay's Community</h2>
                    <p>
                    Join a community of moms to exchange experiences and tips, support each other on your journeys of motherhood, and explore the world of parenting together in a collaborative and understanding environment.

                    </p>
                    <button> join now</button>

                </div>
                <div className=" img">
                    <img src={chatimg} loading='lazy'>
                    </img>

                </div>

            </div>

        </div>
    
     
    )
}