import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#121212] text-[#EDEDEC]">
                <header className="w-full bg-black shadow-md">
                    <div className="flex items-center justify-between px-3 py-2 lg:px-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2 text-lg font-semibold text-[#EDEDEC]">
                            <Link href={route('home')}>
                                <img
                                    style={{ width: '75px', height: '75px' }}
                                    src="https://media-hosting.imagekit.io/cccbfd8e291e48d8/istockphoto-1010001882-612x612-removebg-preview.png?Expires=1839586388&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Hx85yJu80t5jitWbZCc03uoOepPjgwgAydlInN94sfJ0c8NlA4fNWUOlFqCwdr3nW0DbLm-bJJnWCyAdMl~EJ5zDzRUpHl5U57DBCdTHB7KAWBito9ShcdVnEps9EXltCbQfXzF5Teo5sXXLraCpDoqHCDKKOKt63qSMPg4I76tfqt~h6cH~hmB6vRxx~y3VI~hXIW~Gm1GEC33iU5IoCaWdtxHKcTjRaLrjpvsDyy8kI8z9zcOr1pUWWNcNGqY7wZRYgpazJMAVg-sbzzD-O-zjqYeLeYrrj1jFpxCwFB1iAVK6vUhvsgFbwoL8S3Q9-5wAvqH2O5BxCYQ5GyLh-g__"
                                    alt="AI Chatbot Logo"
                                    className="w-auto"
                                />
                            </Link>
                            <span className="text-[#00BFFF]">Cypher</span> {/* Light blue text */}
                        </div>

                        {/* Navbar */}
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#EDEDEC] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#ffffff]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#ffffff]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#EDEDEC] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#ffffff]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Body Content */}
                <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                    <img
                        src="https://media-hosting.imagekit.io/67a83b13492d4787/unnamed-removebg-preview.png?Expires=1839587704&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=q0K-aCNq9BhmdedFuaOGfmTZccqeNFGOMLGW6ps2H98Sfd63R47GAlzj6jplhs62Hsg4t~EhSQ36pmfx0hp7wtl1ZUm3hDDq1z1ysCzJruZGvBeJMvFqzuZKPInP9JG0xg2efR8tsQQM4Pa8Gtkwh0u6bbePbTKYJvJYuC1rVsEc9bXNaLJSLnQE4pIdfjj49GwoUniw9SeJwynmPRwWk-y~-zWCFJ9hNKC2xEF4oGjSFyoKGucDWScXBF3Fxv2mDxfu2NFG4BS~uqkxZCMZncqkp9CJhcQmSPd5cDtRgs~2OFHsPLXx78gOhD~DwsfwlxiC881Zfb4iFvRqO2juYQ__"
                        alt="Welcome to Cypher Chat Bot"
                        className="mb-6 w-48 h-auto"
                    />
                    <h1 className="text-2xl font-bold text-[#00BFFF]">Hello, Welcome to Cypher Chat Bot</h1>
                    <p className="mt-4 text-lg text-[#EDEDEC]">
                        Experience the power of AI with Cypher Chat Bot. Start your journey now!
                    </p>
                </main>
            </div>
        </>
    );
}
