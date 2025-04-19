import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutMaster() {
    return (
        <>

            <div className="d-flex flex-column min-vh-100">

                <Navbar />

                <div className="flex-grow-1 container py-5 mt-5">
                    <Outlet />
                </div>

                <Footer />

            </div >

        </>
    )
}