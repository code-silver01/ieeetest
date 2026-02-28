import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from our Express backend
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:3000/members');
                if (!response.ok) {
                    throw new Error('Failed to fetch team members');
                }
                const data = await response.json();
                setTeamMembers(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching members:", err);
                setError("Unable to load team members at this moment.");
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

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
                        The dedicated individuals driving innovation, technical excellence, and collaboration across IEEE RITB chapters.
                    </p>
                </div>

                {/* Loading / Error States */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-2xl mx-auto">
                        <p className="text-red-400 font-medium">{error}</p>
                        <p className="text-slate-500 text-sm mt-2">Is the backend server running on port 3000?</p>
                    </div>
                )}

                {/* Responsive CSS Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <TeamCard key={member.usn} member={member} />
                        ))}

                        {teamMembers.length === 0 && (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                No active members found in the directory.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamSection;
