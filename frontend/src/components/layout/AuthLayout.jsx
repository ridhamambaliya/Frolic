import BgAuth from "../common/BgAuth";

const AuthLayout = ({ title, subtitle, children, sideContent, footer }) => {
    return (
        <div className="bg-secondary min-h-screen flex items-center justify-center overflow-x-hidden antialiased py-10">
            <BgAuth />

            <div className="container max-w-6xl mx-auto px-6 mt-5 grid lg:grid-cols-2 gap-12 items-center z-10">

                {/* LEFT SIDE */}
                <div className="brand-section text-center lg:text-left space-y-2 lg:pr-12">
                    {sideContent}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex justify-center lg:justify-end">
                    <div className="glass glass-card w-full max-w-md p-8 md:p-10 rounded-[32px]">
                        <div className="mb-8 text-left">
                            <h2 className="text-3xl font-bold text-white mb-1">{title}</h2>
                            <p className="text-slate-400 text-md ">{subtitle}</p>
                        </div>

                        {children}
                        {footer && (
                            <div className="mt-5 text-center text-md">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;