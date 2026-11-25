interface MainpageProps {
  open: boolean;
  contents: any[];
  setContents:Function;
}

export default function SharedBrain({open, contents, setContents}:MainpageProps){
    return <div className="bg-[#EEEFE8]">
        SharedBrain
    </div>
}