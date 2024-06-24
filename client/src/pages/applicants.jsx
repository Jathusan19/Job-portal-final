import React, {useEffect, useState} from 'react';
import {apiRequest} from "../utils/index.js";
import {useSelector} from "react-redux";
import {Dialog, Transition} from '@headlessui/react'
import {ListBox} from "../components/index.js";
import {Dropdown} from "react-bootstrap";


function Applicants(props) {
    const [data,setData]=useState([])
    const [fetching,setIsFetching] =  useState(false)
    const [modal,setModal] =useState(false)
    const [giveNote,setGiveNote] =useState(false)
    const [jobId,setJobId]=useState(null)
    let [isOpen, setIsOpen] = useState(false)
    const { user } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({})

    function handleClose() {
        setModal(false)
    }


    function color(status) {
        if (status === "Approved") {
            return "inline-flex items-center cursor-pointer rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20"
        } else if (status === "Decline") {
            return "inline-flex items-center cursor-pointer rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20"
        } else {
            return "inline-flex items-center cursor-pointer rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
        }
    }

    console.log(jobId)

    async function handleStatus(status) {
        setIsFetching(true);

        try {
            const res = await apiRequest({
                url: `/job-application/${jobId}/${status}`,
                method: "PUT",
            });

            console.log(res)

            console.log(user._id)
            getJobDetails()
            // if(user?.jobTitle){
            //     setData(res.jobApplications.filter(data=>  data.userId === user._id))
            // }else {
            //     setData(res?.jobApplications);
            // }
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        } finally {
            setIsOpen(false)

        }
    }

    async function handleRecomandation(status) {
        setIsFetching(true);

        try {
            const res = await apiRequest({
                url: `/job-application/${jobId}`,
                data: formData,
                method: "PUT",
            });

            console.log(res)

            console.log(user._id)
            getJobDetails()
            // if(user?.jobTitle){
            //     setData(res.jobApplications.filter(data=>  data.userId === user._id))
            // }else {
            //     setData(res?.jobApplications);
            // }
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        } finally {
            setIsOpen(false)
            setIsOpen(false)

        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "cv" ? e.target.files[0] :value
        }));
    };


    const getJobDetails = async () => {
        setIsFetching(true);

        try {
            const res = await apiRequest({
                url: "/job-application/get-job-applications/",
                method: "GET",
            });

            console.log(user)

            console.log(user._id)
            if(user?.accountType === "lecturer"){
                setData(res.jobApplications.filter(data=>  data.lecture === user._id))
            }else if(user?.jobTitle){
                setData(res.jobApplications.filter(data=>  data.userId === user._id))
            }else {
                setData(res?.jobApplications);
            }
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getJobDetails()
    }, []);
    console.log(modal)

    return (
        <div className={"container m-auto my-20 py-5"}>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">degree</th>
                        <th className="px-4 py-2">experience</th>
                        <th className="px-4 py-2">cv</th>
                        <th className="px-4 py-2">email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Recomandation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                            <td className="border px-4 py-2">{item.firstName + " " +  item.lastName}</td>
                            <td className="border px-4 py-2">{item.age}</td>
                            <td className="border px-4 py-2">{item.location}</td>
                            <td className="border px-4 py-2">{item.degree}</td>
                            <td className="border px-4 py-2">{item.experience}</td>
                            <td className="border px-4 py-2 text-blue-500"><a target={"_blank"} href={item.cv}> Link</a> </td>
                            <td className="border px-4 py-2">{item?.email}</td>
                            <td className="border px-4 py-2"><span
                                onClick={() => {
                                    if (!user?.jobTitle) {
                                        setJobId(item._id)
                                        setIsOpen(true)
                                    }
                                }}

                                className={color(item?.status)}>{item?.status}
                            </span>
                        </td>
                            <td className={"p-2 cursor-pointer"} onClick={()=> {
                                setJobId(item._id)
                                setGiveNote(true);
                                setIsOpen(true)
                            }}>
                                <div>{item?.lectureNote || "Give Note"}</div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpen ? (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setIsOpen(false)}
                                    >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {giveNote ?
                                        <div>
                                            <label htmlFor="location" className="block mb-1">Give Recommendation</label>
                                            <input type="text" id="lectureNote" name="lectureNote" value={formData.lectureNote}
                                                   onChange={handleChange}
                                                   className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                                   placeholder="Recommendation" required/>
                                        </div> :
                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            I always felt like I could do anything. That’s the main
                                            thing people are controlled by! Thoughts- their perception
                                            of themselves! They're slowed down by their perception of
                                            themselves. If you're taught you can’t do anything, you
                                            won’t do anything. I was taught I could do everything.
                                        </p>}
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false)
                                            setGiveNote(false)
                                        }}
                                    >
                                        Close
                                    </button>
                                    {!giveNote &&<button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleStatus("Approved")}
                                    >
                                        Approve
                                    </button>}
                                    {!giveNote &&<button
                                        className="bg-white border-amber-950 text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleStatus("Decline")}
                                    >
                                        Decline
                                    </button>}
                                    {giveNote &&<button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleRecomandation("Approved")}
                                    >
                                        Submit
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    );
}

export default Applicants;