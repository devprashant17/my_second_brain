import facebook from "../assets/facebook.png";
import yt from "../assets/yt.png";
import linkedin from "../assets/linkedin.png";

export default function Footer(){
    return <div>
        {/* <hr className="bg-[#EEEFE8] border-2 border-slate-300 " /> */}
        <div className="z-50 bg-[#EEEFE8] flex flex-col items-center">
            <div className="flex mb-2">
                
                <a href="https://www.facebook.com/prashant.karki.374" className="mr-2 h-4 w-4"><img src={facebook}/></a>
                <a href="https://www.youtube.com/@karkisnexus" className="mr-2 h-4 w-4"><img src={yt}/></a>
                <a href="https://www.linkedin.com/in/prashant-karki-58122739b/" className="mr-2 h-4 w-4"><img src={linkedin}/></a>
            </div>
            <p>With love &#10084;</p>
            <div>Copyright &copy; 2026. Prashant Karki. All Rights Reserved.</div>
        </div>
    </div>
}