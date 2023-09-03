
import CEOCard from "@/components/Home/CEOCard";
import DarkKeyFeatureCard from "@/components/Home/DarkKeyFeature";
import FeatureCard from "@/components/Home/FeatureCard";
import FeatureComponent from "@/components/Home/FeatureComponent";
import HomeComponent from "@/components/Home/HomeComponent";
import MoreFeature from "@/components/Home/MoreFeature";


export default function Home() {
    return (
        <div className="mx-4 my-4 ">
            <HomeComponent />

            <MoreFeature />
            <CEOCard />
            <FeatureComponent />
            <DarkKeyFeatureCard />
        </div>
    )
}


