"use client"
import React from 'react'
import Link from 'next/link'

const ResetForm = () => {
    const handlereset = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement;
        if (form) {
            form.reset();
        }
    }
    return (
        <>
            <button type="reset" onClick={handlereset}>
                <Link href="/" className='search-btn text-black font-extrabold'>
                X</Link>
            </button>

        </>
    )
}

export default ResetForm