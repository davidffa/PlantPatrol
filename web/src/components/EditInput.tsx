'use client';
import { useState } from "react";
import Image from "next/image";

interface Props {
  min: number;
  minvalue: number;
  onChange: (minimum: number) => void;
}

const EditInput = ({ min, minvalue, onChange }: Props) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue2, setInputValue2] = useState(String(min));

  const editInput = () => {
      setIsInputVisible((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (e.target.value); // Reference to the ScrollView
    setInputValue2(newValue);
    min = Number(newValue);
    onChange(min);
  };

  return (
    <div>
      {isInputVisible ? (
        <div className="flex ">
          <input type="text" className="h-6 border rounded w-11 bg-transparent text-white border-white mt-12 " value={inputValue2} onChange={handleInputChange} />
          <div className="mt-12 " onClick={editInput}>
            <Image  src="/Vector.svg" alt="Editar" height={22} width={22} />
          </div>
        </div>
      ) :
        (
          <div className="flex">
            <div className="flex mt-12 text-right text-white justify-between px-8" >{minvalue}</div>
            <button className='mt-12' onClick={editInput} >
              <Image src="/Vector.svg" alt="Editar" height={22} width={22} />
            </button>
          </div>
        )
      }
    </div>
  );
};

export default EditInput;