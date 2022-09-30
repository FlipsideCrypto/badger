

const OrgFactory = () => {
    const badgeData = () => {
        useEffect(() => {
            if (!address) return;
    
            fetch(`http://localhost:8000/users/?address=${address}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log('orgdata', data);
                setUserData(data[0]);
            })
        }, [address])
    }
}

export default OrgFactory;


/*
    We get org data from the user call
    We get badge data when we enter any kind of org level
    So the org factory needs badges
    The org factory simply returns Org page cloned as children prop and passed the fetch
    if no data from fetch, show the empty org screen


    We fetch orgs from the user call
    We fetch badges in the org factory
    We pass badges to the badge factory
    - Why do we need a badge factory?
    - i cant remember rn sadly 
    - !!!(to filter the org at that level based on url params and clone only the relevant element)


    SO badges are fetched from Dashboard
    Orgs are fetched here
    !!! Before web sockets how do we force a re-render when a new obj is created? !!!


    Okay so hooks
*/