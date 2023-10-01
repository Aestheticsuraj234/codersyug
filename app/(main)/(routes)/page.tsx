
import CEOCard from "@/components/Home/CEOCard";
import CodeSnippetQuotes from "@/components/Home/CodeSnippetQuotes";
import DarkKeyFeatureCard from "@/components/Home/DarkKeyFeature";
import FeatureComponent from "@/components/Home/FeatureComponent";
import HomeComponent from "@/components/Home/HomeComponent";
import MoreFeature from "@/components/Home/MoreFeature";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function Home() {

    const initiateProfile = await initialProfile();

    if (initiateProfile) {
        return (
            <div className="mx-4 my-4 ">
                <HomeComponent />
                <CodeSnippetQuotes />
                <MoreFeature />
                <CEOCard />
                <FeatureComponent />
                <DarkKeyFeatureCard />
            </div>
        )
    }


    return redirect("/sign-in")


}
   


