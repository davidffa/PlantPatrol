'use client';
import { useState } from "react";
import Image from "next/image";
import api from "@/services/api";
import CreateIcon from '@mui/icons-material/Create';
interface Props {
  id: string;
  min: number;
  minvalue: number;
  onChange: (minimum: number) => void;
}

const EditInput = ({ id, min, minvalue, onChange }: Props) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue2, setInputValue2] = useState(String(min));


  async function update(newValue: number) {

    const updatedPlant = {
      minimum: newValue,
      amount: newValue
    }
    await api.patch(`/inventory/${id}`, updatedPlant);

    editInput();
  }

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
        <div className="flex w-full">
          <input type="text" className="border rounded w-full bg-transparent text-white border-white " value={inputValue2} onChange={handleInputChange} />
          <button className="w-full text-center mx-auto" onClick={() => update(minvalue)}>
            {/* <Image src="/Vector.svg" alt="Editar" height={22} width={22} /> */}
            <CreateIcon width={22} height={22}/>
          </button>
        </div>
      ) :
        (
          <div className="flex w-full">
            <div className="flex text-right text-white justify-between w-full" >{minvalue}</div>
            <button className='w-full text-center mx-auto' onClick={editInput} >
                <CreateIcon width={22} height={22}/>
            </button>
          </div>
        )
      }
    </div>
  );
};

export default EditInput;