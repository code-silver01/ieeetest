import React from 'react';
import TeamCard from './TeamCard';

const teamMembers = [
    { id: 1, name: "Arjun Verma", chapter: "Computer Society (CS)", position: "Chairperson", image: "", description: "Spearheaded national-level hackathons focusing on AI/ML innovations and Web3 technologies." },
    { id: 2, name: "Priya Sharma", chapter: "Women in Engineering (WIE)", position: "Chairperson", image: "", description: "Led technical mentorship programs and industry-led workshops empowering women in STEM." },
    { id: 3, name: "Rohan Kumar", chapter: "Robotics and Automation (RAS)", position: "Technical Head", image: "", description: "Designed the curriculum for line-follower robotics and hardware prototyping competitions." },
    { id: 4, name: "Sneha Reddy", chapter: "Signal Processing Society (SPS)", position: "Vice Chair", image: "", description: "Organized rigorous MATLAB training series and signal analysis symposiums." },
    { id: 5, name: "Vikram Singh", chapter: "Power and Energy Society (PES)", position: "Core Member", image: "", description: "Coordinated industrial visits to smart-grid facilities and sustainable energy talks." },
    { id: 6, name: "Ananya Patel", chapter: "Engineering in Medicine & Biology (EMBS)", position: "Events Head", image: "", description: "Managed the 'Health-Tech' ideathon focusing on accessible biomedical devices." },
    { id: 7, name: "Karan Desai", chapter: "Communications Society (ComSoc)", position: "Secretary", image: "", description: "Facilitated webinars on 5G/6G architecture and IoT communication protocols." },
    { id: 8, name: "Nisha Gupta", chapter: "Computational Intelligence (CIS)", position: "Treasurer", image: "", description: "Managed budget allocations for the annual machine learning research paper conference." },
    { id: 9, name: "Rahul Nair", chapter: "Antennas and Propagation (APS)", position: "Core Member", image: "", description: "Led hands-on RF design hardware sessions and antenna simulation workshops." },
    { id: 10, name: "Aditi Rao", chapter: "Sensors Council (SC)", position: "Chairperson", image: "", description: "Organized the IoT and embedded systems design challenge for sophomore students." },
    { id: 11, name: "Siddharth Bose", chapter: "Microwave Theory & Tech (MTT-S)", position: "Vice Chair", image: "", description: "Guided projects on high-frequency electronics and radar technology." },
    { id: 12, name: "Kavya Menon", chapter: "IEEEXtreme (IX)", position: "Campus Ambassador", image: "", description: "Coordinated the 24-hour global competitive programming challenge logistics locally." },
    { id: 13, name: "Tariq Ali", chapter: "Web Development Team (WEB)", position: "Webmaster", image: "", description: "Maintains and deploys the official IEEE event portals and static websites." },
    { id: 14, name: "Neha Joshi", chapter: "Digital Design (DIGI)", position: "Design Head", image: "", description: "Creates sophisticated branding assets, UI/UX mockups, and social media flyers." },
    { id: 15, name: "Aman Gupta", chapter: "Public Relations (PRSP)", position: "PR Lead", image: "", description: "Manages corporate sponsorships, speaker outreach, and media partnerships." },
    { id: 16, name: "Riya Sen", chapter: "Creativity (CRTY)", position: "Creative Lead", image: "", description: "Curates content strategy, newsletter publication, and creative direction." },
    { id: 17, name: "Deepak Raj", chapter: "Coverage (COVR)", position: "Media Head", image: "", description: "Handles all institutional photography, video editing, and event documentation." }
];

const TeamSection = () => {
    return (
        <section className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-50 mb-4 tracking-tight">
                        Meet Our <span className="text-sky-500">IEEE Leaders</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full mb-6 opacity-80 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        The dedicated individuals driving innovation, technical excellence, and collaboration across all 17 IEEE RITB chapters and operational teams.
                    </p>
                </div>

                {/* Responsive CSS Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
