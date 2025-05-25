import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import Navbar from "../../Home/components/Navbar/Navbar";
import Footer from "../../Home/components/Footer/Footer";
import styles from "./Team.module.css";
import TeamCard from "../components/TeamCard/TeamCard";

// muteam
import execom from "../data/muteam/execom.json";
import core from "../data/muteam/core.json";
import zonal from "../data/muteam/zonal.json";
import district from "../data/muteam/district.json";
import ca from "../data/muteam/ca.json";

// 2023
import pillars from "../data/2023/pillars.json";
import pillarsQ1 from "../data/2023/pillarsQ1.json";
import mulearnhq from "../data/2023/mulearn.json";
import communityteam from "../data/2023/community.json";
import associates from "../data/2023/associates.json";
import enablerhq from "../data/2023/enabler.json";
import techTeam from "../data/2023/tech.json";
import yipteam from "../data/2023/yip.json";

// 2024
import pillars2024 from "../data/2024/pillars.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7 },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TeamSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={styles.team_group}
    >
      {children}
    </motion.section>
  );
};

const Teams = () => {
  const [teamName, setTeamfilter] = useState("all");
  const handleFilterChange = (e: any) => {
    setTeamfilter(e.target.value);
  };
  return (
    <>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Navbar refreshToken={null} />

        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <motion.p
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={styles.fv_heading}
              >
                The <span>Gears</span> Behind The Machine.
              </motion.p>
              <motion.p
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={styles.fv_tagline}
              >
                The 'µLearn' community's growth to this moment would not have
                been possible without the team's soul and heart. Our team has a
                big impact on how well we do our work. Here is the team to which
                we are addressing.
              </motion.p>
            </div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.fv_illustration}
            >
              <img
                className={styles.fv_image}
                src="assets/team/illustration.webp"
                alt=""
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.select_wrapper}
        >
          <select
            className={styles.select}
            value={teamName}
            onChange={handleFilterChange}
          >
            <option value="all" selected>
              All
            </option>
            <optgroup label="2023">
              <option value="execom">Execom</option>
              <option value="mulearnhq">µLearn HQ</option>
              <option value="associates">Associates</option>
              <option value="enablershq">Enablers HQ</option>
              <option value="mulearnpillar3">µLearn Pillars Q3</option>
              <option value="mulearnpillar1">µLearn Pillars Q1</option>
              <option value="communityteam">Community Team</option>
            </optgroup>
            <optgroup label="2022">
              <option value="yip">YIP Team</option>
              <option value="community">Community Team</option>
              <option value="tech">Tech Team</option>
            </optgroup>
          </select>
        </motion.div>


        {(teamName === "all" || teamName === "execom") && (
          <TeamSection>
            <p className={styles.team_title}>Executive Committee</p>
            <p className={styles.team_desc}>
              The Executive Members are those who serve as the community's
              skeleton and propel it forward from the rear.
            </p>
            <div className={styles.members_list}>
              {execom.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.position}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {(teamName === "all" || teamName === "mulearnhq") && (
          <TeamSection>
            <p className={styles.team_title}>µLearn HQ</p>
            <p className={styles.team_desc}>
              The HQ members are the ones who are the backbone of the community.
              They are the ones who are responsible for the smooth functioning of
              different teams and the community as a whole.
            </p>
            <div className={styles.members_list}>
              {mulearnhq.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.position}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                      twitter={member.twitter ? member.twitter : ""}
                      github={member.github ? member.github : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {(teamName === "all" || teamName === "associates") && (
          <TeamSection>
            <p className={styles.team_title}>µLearn Associates</p>
            <p className={styles.team_desc}></p>
            <div className={styles.members_list}>
              {associates.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.position}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                      twitter={member.twitter ? member.twitter : ""}
                      github={member.github ? member.github : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {(teamName === "all" || teamName === "enablerhq") && (
          <TeamSection>
            <p className={styles.team_title}>Enablers HQ</p>
            <p className={styles.team_desc}></p>
            <div className={styles.members_list}>
              {enablerhq.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.position}
                      image={member.image}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {(teamName === "all" || teamName === "mulearnpillar3") && (
          <TeamSection>
            <p className={styles.team_title}>µLearn Pillars Q3</p>
            <p className={styles.team_desc}>
              The Pillars of µLearn are the ones who support the µLearn Community.
              They are a group of students who assist the peers with their work
              and help the community thrive.
            </p>
            <div className={styles.members_list}>
              {pillars.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.team}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                      github={member.github ? member.github : ""}
                      twitter={member.twitter ? member.twitter : ""}
                      muid={member.muid ? member.muid : ""}
                      leadDesignation={member.lead ? member.lead : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}
        {teamName === "mulearnpillar1" && (
          <TeamSection>
            <p className={styles.team_title}>µLearn Pillars Q1</p>
            <p className={styles.team_desc}>
              The Pillars of µLearn are the ones who support the µLearn Community.
              They are a group of students who assist the peers with their work
              and help the community thrive.
            </p>
            <div className={styles.members_list}>
              {pillarsQ1.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.team}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                      github={member.github ? member.github : ""}
                      twitter={member.twitter ? member.twitter : ""}
                      muid={member.muid ? member.muid : ""}
                      leadDesignation={member.lead}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {(teamName === "all" || teamName === "communityteam") && (
          <TeamSection>
            <p className={styles.team_title}>Community Contributors</p>
            <div className={styles.members_list}>
              {communityteam.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.position}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {teamName === "yip" && (
          <TeamSection>
            <p className={styles.team_title}>YIP Organization Team</p>
            <p className={styles.team_desc}>
              Here are the members of the crew and interns who helped to make the
              YIP a big success.
            </p>
            <div className={styles.members_list}>
              {yipteam.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.designation}
                      image={member.image}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {teamName === "community" && (
          <TeamSection>
            <p className={styles.team_title}>Community Team</p>
            <p className={styles.team_desc}>
              The Community Team was the one who brought the achievements at the
              most; it links industry and academia and forges connections between
              students, faculty, mentors, and others.
            </p>
            <p className={styles.sub_team_title}>Core Team</p>
            <div className={styles.members_list}>
              {core.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.designation}
                      image={member.image}
                    />
                  </motion.div>
                );
              })}
            </div>
            <p className={styles.sub_team_title}>Zonal Heads</p>
            <div className={styles.members_list}>
              {zonal.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.designation}
                      image={member.image}
                    />
                  </motion.div>
                );
              })}
            </div>
            <p className={styles.sub_team_title}>District Heads</p>
            <div className={styles.members_list}>
              {district.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.designation}
                      image={member.image}
                    />
                  </motion.div>
                );
              })}
            </div>
            <p className={styles.sub_team_title}>Campus Ambassadors</p>
            <div className={styles.members_list}>
              {ca.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      designation={member.designation}
                      image={member.image}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        {teamName === "tech" && (
          <TeamSection>
            <p className={styles.team_title}>Tech Team</p>
            <p className={styles.team_desc}>
              Here are the members of the crew who contributed to developing the
              website and bot, collected resources and gave suggestions about UX.
            </p>
            <div className={styles.members_list}>
              {techTeam.map((member: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <TeamCard
                      name={member.name}
                      image={member.image}
                      designation={member.team ? member.team : ""}
                      linkedIn={member.linkedin ? member.linkedin : ""}
                    />
                  </motion.div>
                );
              })}
            </div>
          </TeamSection>
        )}

        <Footer />

      </motion.div>
    </>
  );
};

export default Teams;