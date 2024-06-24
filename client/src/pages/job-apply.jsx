import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { CustomButton, JobCard, Loading } from "../components";
import {apiRequest, handleFileUpload} from "../utils";

const noLogo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

const JobApply = () => {
    const { id } = useParams();

    const { user } = useSelector((state) => state.user);

    const [job, setJob] = useState(null);
    const [userData, setUserData] = useState(null);
    const [similarJobs, setSimilarJobs] = useState([]);

    const [selected, setSelected] = useState("0");
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        degree: '',
        experience: '',
        cv: '',
        location: ''
    });

    console.log(user)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "cv" ? e.target.files[0] :value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let jobData = {...formData, job: job._id};
        delete jobData.cv;
        setIsFetching(true);
        console.log(formData.cv)
        const uri = formData.cv && (await handleFileUpload(formData.cv,"raw"));
        console.log(uri);
        jobData.cv = uri;
        // You can add form submission logic here
        console.log(formData);

        jobData.userId = user._id

        try {
            const res = await apiRequest({
                url: "/job-application/job-apply-data",
                token: user?.token,
                data: jobData,
                method: "POST",
            });
            console.log(res)

            setIsFetching(false);
           if(res.success){
               navigate("/job-detail-successfully")
           }
        } catch (error) {
            setIsFetching(false);
            console.log(error);
            // setIsLoading(false);
        }
    };




    const userDetails = async () => {
        setIsFetching(true);

        try {
            const res = await apiRequest({
                url: "/all-user-data",
                method: "GET",
            });

            console.log(res)
            setUserData(res?.users.filter((item) => item.accountType === "lecturer"));
            setSimilarJobs(res?.similarJobs);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        }
    };

    console.log(userData)

    const getJobDetails = async () => {
        setIsFetching(true);

        try {
            const res = await apiRequest({
                url: "/jobs/get-job-detail/" + id,
                method: "GET",
            });

            setJob(res?.data);
            setSimilarJobs(res?.similarJobs);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        }
    };


    useEffect(() => {
        id && getJobDetails();
        userDetails()
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [id]);

    console.log(formData)

    return (
        <div className='container mx-auto'>
            <div className='w-full flex flex-col md:flex-row gap-10'>
                {/* LEFT SIDE */}
                {isFetching ? (
                    <Loading />
                ) : (
                    <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>

                        <h1 className="text-2xl font-semibold mb-6 text-center">Job Application Form</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block mb-1">First Name</label>
                                    <input type="text" id="firstName" name="firstName" value={formData.firstName}
                                           onChange={handleChange}
                                           className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                           placeholder="John" required/>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-1">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" value={formData.lastName}
                                           onChange={handleChange}
                                           className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                           placeholder="Doe" required/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="age" className="block mb-1">Age</label>
                                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange}
                                       className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                       placeholder="25" required/>
                            </div>
                            <div>
                                <label htmlFor="degree" className="block mb-1">Degree</label>
                                <input type="text" id="degree" name="degree" value={formData.degree}
                                       onChange={handleChange}
                                       className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                       placeholder="Bachelor's in Computer Science" required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input type="email" id="email" name="email" value={formData.email}
                                       onChange={handleChange}
                                       className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                       placeholder="Email" required/>
                            </div>
                            <div>
                                <label htmlFor="experience" className="block mb-1">Experience</label>
                                <textarea id="experience" name="experience" value={formData.experience}
                                          onChange={handleChange} rows="4"
                                          className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                          placeholder="Briefly describe your experience"></textarea>
                            </div>
                            <div>
                                <label htmlFor="cv" className="block mb-1">CV</label>
                                <input required={true} type="file" id="cv" name="cv" onChange={handleChange}
                                       className="border border-gray-300 focus:outline-none focus:border-blue-400"/>
                                <p className="text-sm text-gray-500 mt-1">Please upload your CV in PDF or Word
                                    format.</p>
                            </div>
                            <div>
                                <label htmlFor="dropdown" className="block text-gray-700 font-bold mb-2">Choose an
                                    recomandations:</label>
                                <select id="dropdown" name="lecture" onChange={handleChange} required={true}
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="">Select an option</option>
                                    {userData?.map((use,index) => (<option value={use._id}>{use.firstName}</option>))}

                                </select>
                            </div>
                            <div>
                                <label htmlFor="location" className="block mb-1">Location</label>
                                <input type="text" id="location" name="location" value={formData.location}
                                       onChange={handleChange}
                                       className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                                       placeholder="City, Country" required/>
                            </div>
                            <button type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit
                                Application
                            </button>
                        </form>


                    </div>
                )}

                {/* RIGHT SIDE */}
                <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0'>
                    <p className='text-gray-500 font-semibold'>Similar Job Post</p>

                    <div className='w-full flex flex-wrap gap-4'>
                        {similarJobs?.slice(0, 6).map((job, index) => {
                            const data = {
                                name: job?.company.name,
                                logo: job?.company.profileUrl,
                                ...job,
                            };
                            return <JobCard job={data} key={index}/>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;
