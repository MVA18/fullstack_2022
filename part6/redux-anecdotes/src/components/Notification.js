import { connect } from "react-redux";

const Notification = (props) => {

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    if (props.notification) {
        return (
            <div style={ style }>
                { props.notification.message }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let notification = state.notification.slice(-1).pop()
    return {
        notification,
    }
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)
export default ConnectedNotification