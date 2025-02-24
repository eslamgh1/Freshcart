
import style from './LoaderScreen.module.css'
import { ProgressBar } from "react-loader-spinner";



export default function LoaderScreen() {
  return <>
        <div className="h-screen flex justify-center items-start">
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
  </>
}

