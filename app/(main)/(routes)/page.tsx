
import CEOCard from "@/components/Home/CEOCard";
import CodeSnippetQuotes from "@/components/Home/CodeSnippetQuotes";
import DarkKeyFeatureCard from "@/components/Home/DarkKeyFeature";
import FeatureComponent from "@/components/Home/FeatureComponent";
import HomeComponent from "@/components/Home/HomeComponent";
import MoreFeature from "@/components/Home/MoreFeature";



export default async function  Home() {
    
    return (
        <div className="mx-4 my-4 ">
            <HomeComponent />
            <CodeSnippetQuotes/>
            <MoreFeature />
            <CEOCard />
            <FeatureComponent />
            <DarkKeyFeatureCard />
        </div>
    )
}


