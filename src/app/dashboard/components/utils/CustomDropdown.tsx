"use client";
import { useState, useRef, useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const CustomDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>('1');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
        // saveValueAndDoSomethingWithIt(value).then();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const saveValueAndDoSomethingWithIt = async (value: string) => 
        // do something
    };

    const generateNumbersArray = (count: number): number[] => {
        return Array.from({ length: count }, (_, i) => i + 1);
    };

    return (
        <div className={`border rounded-[0.5rem] relative`} ref={dropdownRef}>
            <div className={`p-2 cursor-pointer flex items-center gap-5`} onClick={toggleDropdown}>
                <span>{selectedValue}</span>
                {isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
            </div>
            {isOpen && (
                <div className={`absolute bg-white border rounded-[0.5rem] mt-1 w-full z-10 max-h-[200px] overflow-y-auto 
                scrollbar-thin scrollbar-corner-none scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-track-transparent-hover`}>
                    {generateNumbersArray(20).map((number) => (
                        <div
                            key={number}
                            className={`p-2 cursor-pointer hover:bg-gray-200`}
                            onClick={() => handleOptionClick(number.toString())}
                        >
                            {number}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
