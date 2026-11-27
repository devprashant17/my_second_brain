import { useState } from "react";
import { Copy } from "lucide-react";

function ShareToggle() {
    const [share, setShare] = useState(false);

    return (
        <div>
            <div className='flex'>
                <div className='mr-4'>
                    Share
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShare(!share)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                share ? "bg-[#C6FF46]" : "bg-gray-600"
                            }`}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                                    share ? "left-7 bg-black" : "left-1 bg-white"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`flex mt-2 ${share?"visible":"invisible"}`}>
                <div className="mr-2 ">Share Link:</div>
                <div className="font-bold">fhaa-shskhd-hak12hsks-1hkh</div>
                <Copy className="text-slate-500 hover:text-black active:text-slate-500 ml-2 h-5 w-5"/>
            </div>
        </div>


    );
}

export default ShareToggle;