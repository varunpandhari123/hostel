import { TeamCard } from "./TeamMember";
function About() {

  const varun = {
    name: "Varun",
    designation: "Front-end Engineer",
    image:
      "https://media.licdn.com/dms/image/D5603AQFNvrUIrQCWJA/profile-displayphoto-shrink_800_800/0/1687961471636?e=1721260800&v=beta&t=EjfGPc-z2wKOmStM_GxHUxx_oH8pOflH51EoHtsuQ-4",
    profileLink:  "https://www.linkedin.com/in/varun-pandhari-236b33244/?originalSubdomain=in",
  };
  const guru = {
    name: "Guruprasad",
    designation: "Backend-end Engineer",
    image:
      "https://media.licdn.com/dms/image/D5616AQGl_GSVewUHPQ/profile-displaybackgroundimage-shrink_350_1400/0/1688132562738?e=1721260800&v=beta&t=WL6H3EOMbFOXAoExqDHfz59dUkmOC2ZZDhKJKpERA7I",
    profileLink: "https://www.linkedin.com/in/guruprasad-ghaligi-1b0639232/?originalSubdomain=in",
  };
  const yemmi = {
    name: "Roshan",
    designation: "Front End Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };
  const akshya = {
    name: "Akshtaraj",
    designation: "Front End Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };
  const sahana = {
    name: "Sahana ",
    designation: "Database",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        Meet Our Team!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <TeamCard member={varun} />
        <TeamCard member={guru} />
        <TeamCard member={yemmi} />
        <TeamCard member={sahana} />
        <TeamCard member={akshya} />
      </div>
    </>
  );
}
export { About };
