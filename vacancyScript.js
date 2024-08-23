srcdb = 202501;

async function getCourseDetailsFromCRN(crn) {
    const url = "https://classes.oregonstate.edu/api/?page=fose&route=details";
    const query = {
        body: `${encodeURIComponent(`{
                "key":"crn:${crn}",
                "srcdb": ${srcdb}
            }`)}`,
        method: "POST",
    };

    const res = await fetch(url, query);

    let obj = res.json();
    return obj;
}

let course = getCourseDetailsFromCRN(10678);
course.then((course) => {
    console.log(course);
});