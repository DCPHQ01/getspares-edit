import { useRouter } from "next/navigation";
import { MdDoneAll } from "react-icons/md";
import { paths } from "../../path/paths";
export default function EmailVerified() {
  const router = useRouter();
  return (
    <div className="w-96">
      <div
        className="border border-mecaBorderColor p-4 rounded-xl w-fit mx-auto"
        id="keyIconDiv"
      >
        <MdDoneAll size={24} className="text-mecaGoBackArrow" id="keyIcon" />
      </div>
      <h2
        className="text-mecaDarkBlueBackgroundOverlay font-bold text-center text-3xl pt-4"
        id="emailVerifiedHeader"
      >
        Email verified
      </h2>
      <p
        className="text-mecaGrayBodyText text-center px-8 flex flex-col pt-2"
        id="emailVerifiedText"
      >
        Congratulations, your email has been verified, click on the button to
        continue.
      </p>
      <button
        id="emailVerifiedBtn"
        className="w-full bg-mecaBluePrimaryColor text-[white] lg:text-lg text-sm font-semibold rounded-[36px] lg:h-12 h-8 hover:bg-mecaBluePrimaryColor mt-8"
        onClick={() => {
          router.push(paths.toLogin());
        }}
      >
        Continue
      </button>
    </div>
  );
}
