'use client';
import { useState } from "react";

interface Props {
    min: number;
    minvalue:number;
    onChange: (minimum: number) => void;
}

const EditInput = ({min, minvalue, onChange}:Props) => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [inputValue2, setInputValue2] = useState(String(min));


    const editInput = () => {
        if (isInputVisible) {
            setInputValue(''); // Limpa o valor ao esconder o input
          }
          setIsInputVisible((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue =(e.target.value);
        setInputValue2(newValue); // Atualiza o estado local
        min = Number(newValue);
        onChange(min);
      };

    return (
        <div>
            {!isInputVisible && 
            <div className="flex">
                <div className="flex mt-12 text-right text-white justify-between px-8" >{minvalue}</div>
                    <button className='mt-12' onClick={editInput} >
                        <img src="/Vector.svg" alt="Editar"/>
                    </button>
            </div>
            }
        {isInputVisible && (
            <div className="flex ">
                <input type="text" className="h-6 border rounded w-11 bg-transparent text-white border-white mt-12 " value={inputValue2} onChange={handleInputChange}/>
                <img className="mt-12 " src="/Vector.svg" alt="Editar" onClick={editInput} />
            </div>
        )}
        </div>
    );
};


export default EditInput;