import BackDrop from "../backdrop";

type Props = {
  src: string;
};

const Iframe = ({ src }: Props) => {
  return (
    <>
      <dialog
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="fixed left-0 top-24 z-10 mx-auto h-full w-[calc(100%-6rem)] opacity-100 "
        open
      >
        <iframe src={src} className="m-0 h-full w-full bg-black p-0">
          {/* <p> Some issue with browser support</p> */}
        </iframe>
      </dialog>
      <BackDrop />
    </>
  );
};

export default Iframe;
