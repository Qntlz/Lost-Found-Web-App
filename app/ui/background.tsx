import './globals.css'

export default function AnimatedBackground() {
    return (
        <>
            {/* <div className="background-gradient"></div> */}
            <div className="animated-bg hidden md:block">
                {/* Bottle */}
                <div className="icon bg-[url('/1.svg')] top-[15%] left-[8%] animate-drift1 hidden xl:block"></div> 
                {/* Wallet */}
                <div className="icon bg-[url('/2.svg')] top-[14%] right-[10%] animate-drift2 hidden xl:block"></div>
                {/* Keys */}
                <div className="icon bg-[url('/3.svg')] top-[42%] left-[9%] animate-drift3 hidden  xl:block"></div>
                {/* Phone */}
                <div className="icon icon bg-[url('/4.svg')] bottom-[25%] left-[5%] animate-drift4 hidden xl:block"></div>
                {/* Earbuds */}
                <div className="icon bg-[url('/5.svg')] bottom-[21%] right-[10%] animate-drift5 hidden xl:block"></div>
                {/* ID */}
                <div className="icon bg-[url('/6.svg')] bottom-[50%] right-[10%] animate-drift6 hidden xl:block"></div>
            </div>
        </> 
    );
}