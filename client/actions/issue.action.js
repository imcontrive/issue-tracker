const issueAction = {
  getNotifications: fetch("/api/v1/issues/notification", {
    headers: {
      "Content-Type": "application/json",
      authorization: `token ${localStorage.token}`
    }
  })
    .then(res => res.json())
    .then(ntfs => {
      console.log(ntfs, "ntfs in issue action");
      const lastNtfs = ntfs[ntfs.length - 1];
      fetch("/api/v1/issues/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `token ${localStorage.token}`
        },
        body: JSON.stringify(lastNtfs)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log(data, "data in issue act");
            cb(true);
          }
        });
      // })
    })
};

export default issueAction;
