import Lottie from "react-lottie";
import animationData from "../../assets/animacion.json";

export const EmptyAnimation = () => {
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
                <Lottie options={defaultOptions} width={300} height={300}/>
                <p className="text-indigo-500 font-semibold m-auto">
                    Agrega productos al carrito
                </p>
            </div>
    );
};
