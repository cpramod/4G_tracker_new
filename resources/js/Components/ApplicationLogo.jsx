import React from "react";

export default function ApplicationLogo(props) {
    return (
        <React.Fragment>
            <img src="/images/4g-logo.png" className={`${props?.className}`} />
        </React.Fragment>
    );
}
