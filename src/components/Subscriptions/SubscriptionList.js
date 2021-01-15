import React, { useContext, useEffect } from "react"
import { PostContext } from "../Posts/JBPostProvider"
import { SubscriptionContext } from "./SubscriptionProvider"



export const SubscriptionList = props => {
    const { subscriptions, getMySubscriptions } = useContext(SubscriptionContext)
    const { posts, getAuthorPostsById } = useContext(PostContext)

    useEffect(() => {
        const userId = parseInt(localStorage.getItem("rare_user_id"))
        getMySubscriptions(userId)
        const authorId = subscriptions.author_id
        getAuthorPostsById(authorId)
    }, [])

    return (
        <div style={{ margin: "0rem 3rem"}}>
            <h1>My Subscriptions</h1>

            <article className="subscribedPosts">
                {
                    posts.map(post => {
                        return <section className="subscribedPosts" key={post.id}>
                        <h3>{post.content}</h3>
                        </section>
                    })
                }
            </article>
        </div>
    )
}
