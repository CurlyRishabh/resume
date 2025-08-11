import { experienceData } from "../data";

export default function Experience() {
    const formatDate = (dateString) => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    };

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        
        if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''}`;
        } else {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            if (remainingMonths === 0) {
                return `${years} year${years !== 1 ? 's' : ''}`;
            } else {
                return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
            }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black snap-start" id="experience">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent">
                            Work Experience
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        My professional journey building scalable applications and AI-driven solutions
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent2 via-accent to-primary rounded-full hidden lg:block" />

                    <div className="space-y-12 lg:space-y-16">
                        {experienceData.map((experience, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col lg:flex-row ${
                                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                } items-center gap-8`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Content Card */}
                                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : "lg:pl-12"}`}>
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 hover:border-accent2/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent2/10 group">
                                        {/* Company Header */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-accent2 to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-lg">
                                                    {experience.company.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-accent2 transition-colors">
                                                    {experience.company.name}
                                                </h3>
                                                <p className="text-accent font-semibold text-lg">
                                                    {experience.role[0].title}
                                                </p>
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                                        </svg>
                                                        {formatDate(experience.employment_period.start_date)} - {formatDate(experience.employment_period.end_date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                                        </svg>
                                                        {calculateDuration(experience.employment_period.start_date, experience.employment_period.end_date)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="space-y-4">
                                            {experience.tasks.map((task, taskIndex) => (
                                                <div key={taskIndex} className="flex items-start gap-3 group/task">
                                                    <div className="w-2 h-2 bg-accent2 rounded-full mt-2 flex-shrink-0 group-hover/task:bg-accent transition-colors"></div>
                                                    <p className="text-gray-300 leading-relaxed group-hover/task:text-white transition-colors">
                                                        {task}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Company Link */}
                                        <div className="mt-6 pt-4 border-t border-gray-700/50">
                                            <a
                                                href={experience.company.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-accent2 hover:text-accent transition-colors text-sm font-medium"
                                            >
                                                <span>Visit Company</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-accent2 to-accent rounded-full border-4 border-black shadow-lg z-10">
                                    <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden lg:block w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Summary */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-accent2/10 to-accent/10 rounded-2xl p-8 border border-accent2/20 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Professional Highlights
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-accent2 mb-2">1+</div>
                                <div className="text-gray-300">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-accent mb-2">3</div>
                                <div className="text-gray-300">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">30%+</div>
                                <div className="text-gray-300">Efficiency Improvements</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
