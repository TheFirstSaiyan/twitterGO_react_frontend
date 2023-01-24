function FriendTweet(props) {
    return (<div className="d-flex flex-column shadow mt-2 mb-2 p-2 border text-start rounded-3 border-dark" style={{ width: "100%", height: "fit-content" }}>
        <div className="text-start">
            {props.tweet.content}
        </div >
        <div className = 'text-success text-sm-end'>{props.tweet.createdAt}</div>
    </div>);
}

export default FriendTweet;