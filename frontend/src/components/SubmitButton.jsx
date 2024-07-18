import React from 'react'

const SubmitButton = ({ onSubmit }) => {
  return (
    <section className="m-auto flex items-center justify-center max-w-lg my-10 px-6">
    <button
        onClick={ onSubmit }
        className="block bg-pink-300 text-black text-center py-4 px-6 rounded-xl hover:bg-pink-500"
    >
        Submit
    </button>
    </section>  
  )
}

export default SubmitButton