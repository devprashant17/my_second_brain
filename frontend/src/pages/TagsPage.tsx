interface MainpageProps {
  open: boolean;
  contents: any[];
  setContents:Function;
}

export default function TagsPage({open, contents, setContents}:MainpageProps){
    return <div className="bg-[#EEEFE8]">
        TagsPage
    </div>
}