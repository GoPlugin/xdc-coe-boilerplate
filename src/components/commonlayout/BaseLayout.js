import React from "react";
import Header from "./Header";
const BaseLayout = ({ children }) => {
    return <div>
        <Header />
        <main>
            {children}
        </main>

    </div >
}
export default BaseLayout;