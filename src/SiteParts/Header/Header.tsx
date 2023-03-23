import classNames from "classnames";
import React, { useState } from "react";
import "./Header.scss";

export type HeaderProps = {
    deployable?: boolean;
};

export function Header({ deployable = true }: HeaderProps): JSX.Element {
    const [deployed, setDeployed] = useState(!deployable);
    return (
        <header
            //onMouseEnter={() => setDeployed(true)}
            className={"GameMenuHeaderReduct"}
        >
            <header
                onMouseLeave={() => setDeployed(false)}
                className={classNames({
                    GameMenuHeaderDeployable: true,
                    deployed: deployed,
                })}
            >
                <div className={"HeaderContent"}>
                    <h1>Bienvenue sur TouPtiJeux.fr</h1>
                </div>
            </header>
            {!deployed && <span>TouPtiJeux.fr</span>}
        </header>
    );
}
