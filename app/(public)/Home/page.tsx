import Link from "next/link";

export default function Page() {
    return (
        <main className="relative min-h-screen bg-[#151B23] text-white px-6 py-10 overflow-hidden">


            {/* Features Section */}
            <section className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="bg-[#1F2933] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </section>
        </main>
    );
}

const features = [
    {
        title: "Create Tournaments",
        description:
            "Quickly set up tournaments with teams, formats, and schedules.",
    },
    {
        title: "Live Match Control",
        description:
            "Update scores and events in real-time from the admin panel.",
    },
    {
        title: "Real-Time Viewing",
        description:
            "Users can watch match progress live with instant updates.",
    },
];