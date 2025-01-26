interface LupaProps {
    placeholder: string;
    onSubmit: (value: string) => void;
}
import { useState } from "react";
export function InputBuscar({ placeholder, onSubmit }: LupaProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue);
    };

    return (
        <form id="busqueda" className="flex items-center w-full " onSubmit={handleSubmit}>
            <div className="relative w-full item">
                <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white">
                </div>
                <input
                    id="busqueda-input"
                    type="text"
                    className="inputLupa bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-3"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <button
                    type="submit"
                    style={{ display: 'none' }}
                />
            </div>
        </form>
    );
}