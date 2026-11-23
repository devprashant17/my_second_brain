import Mainpage from '../components/mainpage';

interface MainpageProps {
  open: boolean;
}

export default function AllContents({ open }: MainpageProps) {
  return (
    <div >
      <Mainpage open={open} />
    </div>
  );
}

