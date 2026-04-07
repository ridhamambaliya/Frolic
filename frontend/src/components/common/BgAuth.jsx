const BgAuth = () => {
    return (
      <div className="fixed inset-0 z-10 bg-primary">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
        </div>
        <div className="orb w-[20vw] h-[20vw] bg-indigo-500/50 -top-[10%] -left-[5%]"></div>
        <div className="orb w-[20vw] h-[20vw] bg-purple-500/50 bottom-[5%] -right-[5%]"></div>
        <div className="orb w-[20vw] h-[20vw] bg-pink-500/50 top-[35%] left-[30%] "></div>
      </div>
    )
}

export default BgAuth;
