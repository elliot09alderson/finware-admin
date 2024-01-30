import { Link, useNavigate } from "react-router-dom";

function DocumentsUpload({ files, setFiles }) {
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  return (
    <div className=" bg-[#283046] w-full flex flex-col p-5 gap-5 justify-center items-center rounded-lg ">
      <h2 className="text-2xl text-white ">Welcome to One Stop Fashion</h2>

      <div className="border-2 border-white border-dotted flex gap-5 flex-col justify-center items-center p-3 rounded-md">
        <h2 className="text-white font-semibold text-xl  text-left">
          Adhaar upload
        </h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="rounded-md duration-500 text-gray-500"
        />
      </div>
      <div className="border-2 border-white border-dotted gap-5 flex flex-col justify-center items-center p-3 rounded-md">
        <h2 className="text-white font-semibold text-xl text-left">
          PAN Upload
        </h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="rounded-md duration-500 text-gray-500"
        />
      </div>

      <div className="border-2 border-white border-dotted  gap-5 flex flex-col justify-center items-center p-3 rounded-md">
        <h2 className="text-white font-semibold text-xl  text-left">
          GST Upload
        </h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="rounded-md duration-500 text-gray-500"
        />
      </div>
    </div>
  );
}
export default DocumentsUpload;
