import { connect } from 'react-redux';

const UserList = (props) => {
    const users = () => {
        return props.users
    }

    // const blogsCount = () => {
    //     props.getuserBlogs(blog)
    // }

    return (
        <ul>
            { users().map(user =>
                <div key={ user.id }>
                    <div>
                        { user.name }
                    </div>
                    <div>
                        has 10
                    </div>
                </div>
            ) }
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {}

const ConnectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList)
export default ConnectedUserList