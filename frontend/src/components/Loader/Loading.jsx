import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
        <HashLoader
            color="#0067FF"
            size={50}
            cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "red",
            }}
        />
    </div>
  )
}

export default Loading
