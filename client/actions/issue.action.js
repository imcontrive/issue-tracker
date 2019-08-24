const issueAction = {
    getNotifications: (socket, cb) => dispatch => {
        fetch('/api/v1/issues/notification', {
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(ntfs => {
            socket.on('notification', (notifis) => {
                const lastNtfs = notifis[notifis.length - 1]
                console.log(lastNtfs, 'ntfs in issue action')
                fetch('/api/v1/issues/mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `token ${localStorage.token}`
                    },
                    body: JSON.stringify(lastNtfs)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        console.log(data, 'data in issue act')
                        cb(true);
                    }
                })
            })
        })
    }
    
}

export default issueAction;