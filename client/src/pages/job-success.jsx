import React from 'react';

function JobSuccess(props) {
    return (
        <div className='container mx-auto'>
            <div className='w-full flex flex-col my-6 py-52 gap-10'>

                <div className={"text-center m-auto my-6 py-6"}>
                    <div className={"flex justify-center"}>

                        <svg className="h-32 mb-5 py-5 w-32 text-green-400 rounded-full border-4 border-green-100 p-2"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <h1 className="text-5xl font-semibold mb-6 text-center">Successfully Applied for Job</h1>
                </div>
            </div>
        </div>
    );
}

export default JobSuccess;