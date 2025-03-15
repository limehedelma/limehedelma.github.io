"use client";
import Window from "./components/window";
import Footer from "./components/footer";
import MainPage from "./components/mainpage";
import {Conversation} from "@/app/components/conversation";

export default function Home() {

    return (
        <>
            <Window title="Home">
                <MainPage />
                </Window>

                <Footer/>

        </>
    );
}
