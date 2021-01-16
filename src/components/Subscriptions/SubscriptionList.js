import React, { useContext, useEffect } from "react"
import { SubscriptionContext } from "./SubscriptionProvider"



export const SubscriptionList = props => {
    const { getMySubscriptions, posts } = useContext(SubscriptionContext)

    useEffect(() => {
        const userId = parseInt(localStorage.getItem("rare_user_id"))
        getMySubscriptions(userId)
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
