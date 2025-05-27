// @ts-ignore
import partners from "./data/partners.js";

import fvimg from "./assets/Coding workshop.gif";
import CommunityCard from "./CommunityCard/CommunityCard";

type Partner = {
  name: string;
  image: string;
  link: string;
  customlink?: string;
};

const CommunityPartner = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="text-center md:text-left md:w-1/3 ">
            <p className="font-sans text-4xl font-semibold text-[#303030] md:text-6xl md:leading-tight">
              <span className="font-semibold text-[#5570f1]">µLearn Community</span> Partners
            </p>
            <p className="mt-4 md:mt-4 text-base md:text-[1.1rem] w-full font-[Poppins]">
              When a group of like-minded people come together interesting
              things take place. What if multiple Communities join their hands
              together for a common aim things get much more interesting!
            </p>
          </div>

          <div >
            <img src={fvimg} alt="" className="block  mt-0 w-[20rem] md:w-[30rem]" />
          </div>  
        </div>

        <div className="bg-white  max-w-6xl">
          <div className="lg:w-1/2 flex flex-col text-center md:text-left relative lg:left-[-2rem] ">
            <p className="text-2xl md:text-3xl font-semibold font-sans">
              <span className="text-[#5570f1]">Community</span> Partners
            </p>
            <p className="mt-4 md:mt-4 text-base md:text-[1.1rem] mx-8 font-[Poppins]">
              µLearn has partnered with multiple communities to provide the
              peers the best resources and events to learn and up-skill
              themselves.
            </p>
          </div>
          <div className="grid grid-cols-1 place-items-center gap-y-4 sm:grid-cols-2  md:grid-cols-3 ">
            {(partners as Partner[]).map((partner) => (
              <CommunityCard
                key={partner.name}
                cname={partner.name}
                cimage={partner.image}
                clink={partner.link}
                customlink={partner.customlink}
                type=""
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPartner;
