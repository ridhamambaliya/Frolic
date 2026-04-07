const BgUser = () => {
  return (
    <div className="fixed inset-0 z-10 bg-primary">
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="orb w-[450px] h-[450px] bg-purple-500 bottom-[10%] -right-[5%] absolute rounded-full blur-[80px] opacity-20"></div>
    </div>
  );
};
export default BgUser;