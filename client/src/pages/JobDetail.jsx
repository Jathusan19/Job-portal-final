import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { CustomButton, JobCard, Loading } from "../components";
import { apiRequest } from "../utils";
import {pluck} from "underscore";

const noLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

const JobDetail = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const [job, setJob] = useState(null);
  const [save, setSave] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);

  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();



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

  const getSaveJobDetails = async () => {
    setIsFetching(true);

    try {
      const res = await apiRequest({
        url: "/save/get-save/",
        method: "GET",
      });

      console.log(res)
      setSave(pluck(res.filter((item) => item.userId === user?._id),"job"));
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  console.log(save)

  const handleDeletePost = async () => {
    setIsFetching(true);

    try {
      if (window.confirm("Delete Job Post?")) {
        const res = await apiRequest({
          url: "/jobs/delete-job/" + job?._id,
          token: user?.token,
          method: "DELETE",
        });

        if (res?.success) {
          alert(res?.messsage);
          window.location.replace("/");
        }
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };
  useEffect(() => {
    id && getJobDetails();
    getSaveJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

 async function saveStatus() {
   if(save.includes(job._id)){
        setIsFetching(true);
      try {
        const res = await apiRequest({
            url: "/save/unsave-job/"+ job._id,
            method: "GET",
        });
        setIsFetching(false);
        console.log(res);
        } catch (error) {
        setIsFetching(false);
        console.log(error);
        } finally {
        getSaveJobDetails();
      }
   }else {
     setIsFetching(true);
     let datee= {userId :user?._id, job : job._id}
     try {
       const res = await apiRequest({
         url: "/save/save-job/",
         data: datee,
         method: "POST",
       });
       setIsFetching(false);
       console.log(res);
     } catch (error) {
       setIsFetching(false);
       console.log(error);
     } finally {
       getSaveJobDetails();
     }
   }


  }



  return (
    <div className='container mx-auto'>
      <div className='w-full flex flex-col md:flex-row gap-10'>
        {/* LEFT SIDE */}
        {isFetching ? (
          <Loading />
        ) : (
          <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
            <div className='w-full flex items-center justify-between'>
              <div className='w-3/4 flex gap-2'>
                <img
                  src={job?.company?.profileUrl || noLogo}
                  alt={job?.company?.name}
                  className='w-20 h-20 md:w-24 md:h-20 rounded'
                />

                <div className='flex flex-col'>
                  <p className='text-xl font-semibold text-gray-600'>
                    {job?.jobTitle}
                  </p>

                  <span className='text-base'>{job?.location}</span>

                  <span className='text-base text-blue-600'>
                    {job?.company?.name}
                  </span>

                  <span className='text-gray-500 text-sm'>
                    {moment(job?.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div className=''>
                <AiOutlineSafetyCertificate className={`text-3xl cursor-pointer ${save?.includes(job?._id) ? `text-blue-700` : `text-gray-500`}`} onClick={saveStatus} />
              </div>
            </div>

            <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
              <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                <span className='text-sm'>Salary</span>
                <p className='text-lg font-semibold text-gray-700'>
                  $ {job?.salary}
                </p>
              </div>

              <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                <span className='text-sm'>Job Type</span>
                <p className='text-lg font-semibold text-gray-700'>
                  {job?.jobType}
                </p>
              </div>

              <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                <span className='text-sm'>No. of Applicants</span>
                <p className='text-lg font-semibold text-gray-700'>
                  {job?.application?.length}
                </p>
              </div>

              <div className='bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                <span className='text-sm'>No. of Vacancies</span>
                <p className='text-lg font-semibold text-gray-700'>
                  {job?.vacancies}
                </p>
              </div>

              <div className='bg-[#ffcddf] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                <span className='text-sm'>Yr. of Experience</span>
                <p className='text-lg font-semibold text-gray-700'>
                  {job?.experience}
                </p>
              </div>
            </div>

            <div className='w-full flex gap-4 py-5'>
              <CustomButton
                onClick={() => setSelected("0")}
                title='Job Description'
                containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                  selected === "0"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              />

              <CustomButton
                onClick={() => setSelected("1")}
                title='Company'
                containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                  selected === "1"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              />
            </div>

            <div className='my-6'>
              {selected === "0" ? (
                <>
                  <p className='text-xl font-semibold'>Job Decsription</p>

                  <span className='text-base'>{job?.detail[0]?.desc}</span>

                  {job?.detail[0]?.requirements && (
                    <>
                      <p className='text-xl font-semibold mt-8'>Requirement</p>
                      <span className='text-base'>
                        {job?.detail[0]?.requirements}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className='mb-6 flex flex-col'>
                    <p className='text-xl text-blue-600 font-semibold'>
                      {job?.company?.name}
                    </p>
                    <span className='text-base'>{job?.company?.location}</span>
                    <span className='text-sm'>{job?.company?.email}</span>
                  </div>

                  <p className='text-xl font-semibold'>About Company</p>
                  <span>{job?.company?.about}</span>
                </>
              )}
            </div>

            <div className='w-full'>
              {user?._id === job?.company?._id ? (
                <CustomButton
                  title='Delete Post'
                  onClick={handleDeletePost}
                  containerStyles={`w-full flex items-center justify-center text-white bg-red-700 py-3 px-5 outline-none rounded-full text-base`}
                />
              ) : (
                <CustomButton
                    onClick={()=>navigate(`/job-detail/${job?._id}/apply`)}
                  title='Apply Now'
                  containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
                />
              )}
            </div>
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
              return <JobCard job={data} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
