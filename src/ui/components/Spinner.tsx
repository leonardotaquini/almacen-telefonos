import Lottie from "react-lottie";
import animationData from "../../assets/loadingAnimation.json";

export const Spinner = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
        
    };
  

    return (
            <div className="flex justify-center items-center flex-col">
                <Lottie options={defaultOptions} width={500} height={500}/>
                <p className="text-indigo-500 font-semibold m-auto">
                    Agrega productos al carrito
                </p>
            </div>
    );
};
