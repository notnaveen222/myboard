import RouterButton from "@/components/buttons/router-button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>My Board</div>
      <RouterButton
        className={"border border-white rounded-lg px-3 py-1"}
        path={"auth"}
        title={"Sign up"}
      />
    </div>
  );
}
