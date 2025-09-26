import NavBar from "./NavBar";

const LayoutWarper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />
      <section className="main-section">{children}</section>
    </main>
  );
};

export default LayoutWarper;
