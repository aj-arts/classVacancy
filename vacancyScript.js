async function getCourseDetails(crn) {
    let obj;

    const res = await fetch("https://classes.oregonstate.edu/api/?page=fose&route=search&crn=", {
        body: `${encodeURIComponent(`{"other":{"srcdb":"202302"},"criteria":[{"field":"crn","value":"${crn}"}]}`)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
  
    obj = await res.json()
    return obj
  }
  
async function getMoreDetails(course) {
    let obj;
    
    const res = await fetch("https://classes.oregonstate.edu/api/?page=fose&route=details", {
        body: `${encodeURIComponent(`{"group":"code:${course.results[0].code}","key":"crn:${course.results[0].crn}","srcdb":"202302","matched":"crn:${course.results[0].crn}"}`)}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })
    
    obj = await res.json()
    return obj
}

let course = getCourseDetails(38988)

course.then((course) => {
    let moreDetails = getMoreDetails(course)
    moreDetails.then((moreDetails) => {
        console.log(`
        Course: ${moreDetails.code}
        CRN: ${moreDetails.crn}
        Max Enrollment: ${moreDetails.max_enroll}
        Current Enrollment: ${moreDetails.enrollment}
        Seats Available: ${moreDetails.ssbsect_seats_avail}
        Waitlist Capacity: ${moreDetails.waitlist_capacity}
        Waitlist Count: ${moreDetails.ssbsect_wait_count}
        Waitlist Available: ${moreDetails.ssbsect_wait_avail}
        `)
    })
})