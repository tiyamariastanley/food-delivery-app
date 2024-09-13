import React from "react";

const Contact = () => {
  return (
    <div className="text-center">
      <h1 id="heading" className="font-extrabold text-2xl">
        Contact Page
      </h1>
      <form className="flex flex-col mt-10 w-1/4 gap-5 border border-gray-300 p-3 mx-auto">
        <input type="text" placeholder="Name"></input>
        <input type="text" placeholder="Message"></input>
        <button
          type="submit"
          className="border border-gray-200 bg-white w-fit p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
