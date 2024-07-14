penPlus.handleURLParams = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get('project_url')) {
        fetch(searchParams.get('project_url')).then((response) => response.text()).then(
            (json) => {
                penPlus.loadProjectFile(JSON.parse(json));
            }
        )
    }
}