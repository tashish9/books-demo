import BackDrop from "../backdrop";

type Props = {
  src: string;
};

const Iframe = ({ src }: Props) => {
  return (
    <dialog
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="fixed left-0 top-24 z-10 mx-auto h-full w-[calc(100%-6rem)] opacity-100 backdrop:bg-black "
      open
    >
      <iframe src={src} className="h-full w-full opacity-100">
        <p> Some issue with browser support</p>
      </iframe>
    </dialog>
  );
};

export default Iframe;
