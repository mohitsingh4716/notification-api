import React from "react";

export const InputForm = ({ label, type, placeholder, register, error }) => {
    return (
      <div>
      <label className="block mb-1 text-sm  text-black font-semibold pt-4 px-2">{label}</label>
      <input
        type={type || "text"}
        {...register}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>

    );
}
  



 export const Card= ({title, children})=>{
    return (
        <div
          className="max-w-md mx-auto borde px-12 py-8 rounded-xl shadow-[inset_-12px_-8px_40px_#46464620] bg-[#edededb6]"
        >
          <h1 className="text-xl font-semibold border-b pb-2">
            {title}
          </h1>
          {children}
        </div>
      );
  }



export const SelectForm = ({ label, register, error, options }) => (
    <div>
      <label className="block mb-2 text-sm  text-black font-semibold pt-4 px-2">{label}</label>
      <select {...register} className="w-full p-2 border rounded bg-white">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );

  