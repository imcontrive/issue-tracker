const issueAction = {
    getNotifications: (socket) => dispatch => {
        fetch('/api/v1/issues/notification', {
            headers: {
                'Content-Type': 'application/json',
                authorization: `token ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(ntfs => {
            socket.on('notification', (notifis) => {
            })
        })
    }
}

export default issueAction;