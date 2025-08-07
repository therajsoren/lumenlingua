import Layout from "@/layout/page";

export default function Home() {
  return (
    <div
      className="absolute inset-0 min-h-screen w-full  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#27272a] via-[#52525b]
to-[#a1a1aa]"
    >
      <div className="relative overflow-hidden h-screen">
        <Layout />
      </div>
    </div>
  );
}
