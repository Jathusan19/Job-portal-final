import { useEffect, useState } from "react";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import { CustomButton, JobCard, ListBox, Loading } from "../components";
import Header from "../components/Header";
import { apiRequest, updateURL } from "../utils";
import { experience, jobTypes } from "../utils/data";
import {useSelector} from "react-redux";
import {pluck} from "underscore";

const SavedJobs = () => {
    const [sort, setSort] = useState("Newest");
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState(1);
    const [recordCount, setRecordCount] = useState(0);
    const [data, setData] = useState([]);
    const [saveJobs, setSaveJobs] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [filterJobTypes, setFilterJobTypes] = useState([]);
    const [filterExp, setFilterExp] = useState([]);
    const [expVal, setExpVal] = useState([]);

    const [isFetching, setIsFetching] = useState(false);

    const {id} = useParams();
    console.log(id)

    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {

        if(user.accountType ==="lecturer"){
            navigate("/applications",{state:{from:location}})
        }

    },[user])

    useEffect(() => {
        console.log(location && location.state && location.state.company)
        console.log(location?.state?.company)
    }, [location]);

    const fetchJobs = async (data) => {
        setIsFetching(true);
        //
        // const newURL = updateURL({
        //     pageNum: page,
        //     query: searchQuery,
        //     cmpLoc: jobLocation,
        //     sort: sort,
        //     navigate: navigate,
        //     location: location,
        //     jType: filterJobTypes,
        //     exp: filterExp,
        // });

        // console.log(newURL)


        try {
            const res = await apiRequest({
                url: "/jobs/find-jobs?sort=Newest&jtype=&exp=",
                method: "GET",
            });

            setNumPage(res?.numOfPage);
            setRecordCount(res?.totalJobs);
            console.log(data,"sdfasfd")
            setData(res.data.filter((item) => data.includes(item?._id)));

            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        }
    };

    console.log("saveJobs",saveJobs)

const fetchSavedJobs = async () => {
        setIsFetching(true);

        // const newURL = updateURL({
        //     pageNum: page,
        //     query: searchQuery,
        //     cmpLoc: jobLocation,
        //     sort: sort,
        //     navigate: navigate,
        //     location: location,
        //     jType: filterJobTypes,
        //     exp: filterExp,
        // });
        //
        // console.log(newURL)

        try {
            const res = await apiRequest({
                url: "/save/get-save",
                method: "GET",
            });
            console.log()
            let data = pluck(res.filter((item) => item?.userId === id),"job");
            fetchJobs(data)

            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        }
    };


    const handleShowMore = async (e) => {
        e.preventDefault();
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (expVal.length > 0) {
            let newExpVal = [];

            expVal?.map((el) => {
                const newEl = el?.split("-");
                newExpVal.push(Number(newEl[0]), Number(newEl[1]));
            });

            newExpVal?.sort((a, b) => a - b);

            setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal?.length - 1]}`);
        }
    }, [expVal]);

    useEffect( () => {
         fetchSavedJobs()


    }, [sort, filterJobTypes, filterExp, page]);

    console.log(data)

    return (
        <div>
            {/*<Header*/}
            {/*    title='Find Your Dream Job'*/}
            {/*    type='home'*/}
            {/*    handleClick={handleSearchSubmit}*/}
            {/*    searchQuery={searchQuery}*/}
            {/*    setSearchQuery={setSearchQuery}*/}
            {/*    location={jobLocation}*/}
            {/*    setLocation={setJobLocation}*/}
            {/*/>*/}

            <div className='container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]'>
                {/*<div className='hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm'>*/}
                {/*    <p className='text-lg font-semibold text-slate-600'>Filter Search</p>*/}

                {/*    <div className='py-2'>*/}
                {/*        <div className='flex justify-between mb-3'>*/}
                {/*            <p className='flex items-center gap-2 font-semibold'>*/}
                {/*                <BiBriefcaseAlt2 />*/}
                {/*                Job Type*/}
                {/*            </p>*/}

                {/*            <button>*/}
                {/*                /!*<MdOutlineKeyboardArrowDown />*!/*/}
                {/*            </button>*/}
                {/*        </div>*/}

                {/*        <div className='flex flex-col gap-2'>*/}
                {/*            {jobTypes.map((jtype, index) => (*/}
                {/*                <div key={index} className='flex gap-2 text-sm md:text-base '>*/}
                {/*                    <input*/}
                {/*                        type='checkbox'*/}
                {/*                        value={jtype}*/}
                {/*                        className='w-4 h-4'*/}
                {/*                        onChange={(e) => filterJobs(e.target.value)}*/}
                {/*                    />*/}
                {/*                    <span>{jtype}</span>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className='py-2 mt-4'>*/}
                {/*        <div className='flex justify-between mb-3'>*/}
                {/*            /!*<p className='flex items-center gap-2 font-semibold'>*!/*/}
                {/*            /!*    <BsStars />*!/*/}
                {/*            /!*    Experience*!/*/}
                {/*            /!*</p>*!/*/}

                {/*            /!*<button>*!/*/}
                {/*            /!*    <MdOutlineKeyboardArrowDown />*!/*/}
                {/*            /!*</button>*!/*/}
                {/*        </div>*/}

                {/*       /!*<div className='flex flex-col gap-2'>*!/*/}
                {/*       /!*     {experience.map((exp) => (*!/*/}
                {/*       /!*         <div key={exp.title} className='flex gap-3'>*!/*/}
                {/*       /!*             <input*!/*/}
                {/*       /!*                 type='checkbox'*!/*/}
                {/*       /!*                 value={exp?.value}*!/*/}
                {/*       /!*                 className='w-4 h-4'*!/*/}
                {/*       /!*                 onChange={(e) => filterExperience(e.target.value)}*!/*/}
                {/*       /!*             />*!/*/}
                {/*       /!*             <span>{exp.title}</span>*!/*/}
                {/*       /!*         </div>*!/*/}
                {/*       /!*     ))} *!/*/}
                {/*       /!* </div>*!/*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className='w-full md:w-5/6 px-5 md:px-0'>
                    <div className='flex items-center justify-between mb-4'>
                        <p className='text-sm md:text-base'>
                            Shwoing: <span className='font-semibold'>{data?.length}</span> Jobs
                            Available
                        </p>

                        <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
                            <p className='text-sm md:text-base'>Sort By:</p>

                            <ListBox sort={sort} setSort={setSort} />
                        </div>
                    </div>

                    <div className='w-full flex flex-wrap gap-4'>
                        {data?.map((job, index) => {
                            const newJob = {
                                name: job?.company?.name,
                                logo: job?.company?.profileUrl,
                                ...job,
                            };

                            return <JobCard job={newJob} key={index} />;
                        })}
                    </div>

                    {isFetching && (
                        <div className='py-10'>
                            <Loading />
                        </div>
                    )}

                    {numPage > page && !isFetching && (
                        <div className='w-full flex items-center justify-center pt-16'>
                            <CustomButton
                                onClick={handleShowMore}
                                title='Load More'
                                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedJobs;
