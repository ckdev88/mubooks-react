const BtnNavZoek = ({ bOnClick }: { bOnClick: () => void }) => {
    return (
        <button id="toggleNavBurger" type="button" className="toggleZoekNav" onClick={bOnClick}>
            <span className="alt">Search</span>
            <svg
                className="zoekIconSvg"
                viewBox="0 0 149.84702 148.5"
                version="1.1"
                id="nav-icon-loep"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="nav-icon-loep-path">
                    <title>Search icon</title>
                    <path
                        id="loep-rect1"
                        transform="rotate(-45)"
                        d="m -3.2461977,126.12067 h 8.3973866 c 3.5534027,0 6.4140841,2.86068 6.4140841,6.41408 v 65.15062 c 0,3.55341 -2.8606814,6.41409 -6.4140841,6.41409 h -8.3973866 c -3.5534028,0 -6.4140844,-2.86068 -6.4140844,-6.41409 v -65.15062 c 0,-3.5534 2.8606816,-6.41408 6.4140844,-6.41408 z"
                    />
                    <path
                        id="nav-icon-loep-stroke"
                        d="M 103.48977,56.050812 A 47.438957,47.438957 0 0 1 56.050812,103.48977 47.438957,47.438957 0 0 1 8.6118546,56.050812 47.438957,47.438957 0 0 1 56.050812,8.6118546 47.438957,47.438957 0 0 1 103.48977,56.050812 Z"
                    />
                </g>
            </svg>
        </button>
    )
}

export default BtnNavZoek
