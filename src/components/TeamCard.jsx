import React from 'react';

const TeamCard = ({ member }) => {
    return (
        <div
            tabIndex="0"
            className="group relative bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-slate-800/50 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-sky-500/20 hover:border-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-500 flex flex-col items-center cursor-pointer"
        >
            {/* Normal State Card Content */}
            <div className="p-8 flex flex-col items-center text-center w-full h-full transition-opacity duration-300 group-hover:opacity-10 z-10">
                <div className="w-32 h-32 mb-6 rounded-full border-4 border-slate-800/70 overflow-hidden shadow-inner bg-slate-800 relative">
                    <img
                        src={member.image || `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}&backgroundColor=0f172a&textColor=38bdf8`}
                        alt={`Profile of ${member.name}, ${member.position}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2">{member.name}</h3>
                <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">
                    {member.position}
                </p>
                <p className="text-slate-400 text-sm font-medium">{member.chapter}</p>
            </div>

            {/* Hover Overlay with Description */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/95 via-slate-900/90 to-slate-950/80 flex flex-col items-center justify-center p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-20">
                <h4 className="text-sky-400 font-bold mb-3">{member.chapter} Highlights</h4>
                <p className="text-slate-200 text-center text-sm font-medium leading-relaxed drop-shadow-md">
                    {member.description}
                </p>
            </div>
        </div>
    );
};

export default TeamCard;
