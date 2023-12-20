import {FC} from "react";

interface ButtonProps {
    styles?: string; // Опциональные стили
    titleText: string;

}

const Button: FC<ButtonProps> = ({styles, titleText}) => {
    const title = titleText || 'Давайте начинать';
    const style = styles || 'bg-blue-gradient';
    return (
        <button type="button"
                className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${style}`}>
            {title}
        </button>
    )
};

export default Button;
