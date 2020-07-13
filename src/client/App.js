import React, { Fragment } from "react";
import "client/app.scss";
import {
    Header,
    Main,
    Services,
    Feature,
    Counselors,
    Footer
} from "client/components";

const App = () => {
    return (
        <Fragment>
            <Header />
            {/* <Main />
            <Services />
            <Feature /> */}
            <Counselors />
            <Footer />
        </Fragment>
    );
};

export default App;
