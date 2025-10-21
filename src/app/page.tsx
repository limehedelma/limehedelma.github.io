"use client";
import Mainwindow from "./components/mainwindow";
import MainPage from "./components/mainpage";
import {Terminal} from '@/components/ui/shadcn-io/terminal';


export default function Home() {

    return (
        <>
                <Terminal>
                    <p>Hello World!</p>
                </Terminal>
        </>
    );
}
